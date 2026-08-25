package net.dochi.spawncontrol.command;

import com.mojang.brigadier.arguments.StringArgumentType;
import com.mojang.brigadier.context.CommandContext;
import net.dochi.spawncontrol.counter.SpawnCounterService;
import net.dochi.spawncontrol.diagnostic.SpawnDiagnostics;
import net.dochi.spawncontrol.network.SpawnControlNetwork;
import net.dochi.spawncontrol.persistence.SpawnControlStore;
import net.dochi.spawncontrol.profile.SpawnProfile;
import net.dochi.spawncontrol.runtime.SpawnAttemptResult;
import net.dochi.spawncontrol.scheduler.SpawnScheduler;
import net.minecraft.commands.CommandSourceStack;
import net.minecraft.commands.Commands;
import net.minecraft.commands.SharedSuggestionProvider;
import net.minecraft.network.chat.Component;
import net.minecraft.server.level.ServerPlayer;
import net.minecraftforge.event.RegisterCommandsEvent;

import java.util.List;

public final class SpawnControlCommands {
    private SpawnControlCommands() {
    }

    public static void register(RegisterCommandsEvent event) {
        event.getDispatcher().register(Commands.literal("drmspawn")
                .requires(source -> source.hasPermission(2))
                .then(Commands.literal("open").executes(SpawnControlCommands::open))
                .then(Commands.literal("reload").executes(SpawnControlCommands::reload))
                .then(Commands.literal("validate").executes(SpawnControlCommands::validate))
                .then(Commands.literal("stats").executes(SpawnControlCommands::stats))
                .then(Commands.literal("explain")
                        .then(profileArgument().executes(SpawnControlCommands::explain)))
                .then(Commands.literal("spawn-test")
                        .then(profileArgument().executes(SpawnControlCommands::spawnTest)))
                .then(Commands.literal("clear-generated")
                        .executes(context -> clear(context, ""))
                        .then(profileArgument().executes(context -> clear(context,
                                StringArgumentType.getString(context, "profile"))))));
    }

    private static com.mojang.brigadier.builder.RequiredArgumentBuilder<CommandSourceStack, String> profileArgument() {
        return Commands.argument("profile", StringArgumentType.word())
                .suggests((context, builder) -> SharedSuggestionProvider.suggest(
                        SpawnControlStore.document().profiles.stream().map(profile -> profile.id), builder));
    }

    private static int open(CommandContext<CommandSourceStack> context) {
        try {
            SpawnControlNetwork.sendSnapshot(context.getSource().getPlayerOrException());
            return 1;
        } catch (com.mojang.brigadier.exceptions.CommandSyntaxException exception) {
            context.getSource().sendFailure(Component.literal("This command requires a player."));
            return 0;
        }
    }

    private static int reload(CommandContext<CommandSourceStack> context) {
        List<String> issues = SpawnControlStore.reload(context.getSource().getServer());
        SpawnScheduler.reset();
        context.getSource().sendSuccess(() -> Component.literal("dochi spawn control reloaded; issues=" + issues.size()), true);
        issues.stream().limit(8).forEach(issue -> context.getSource().sendSuccess(() -> Component.literal("- " + issue), false));
        return 1;
    }

    private static int validate(CommandContext<CommandSourceStack> context) {
        List<String> issues = SpawnControlStore.issues();
        context.getSource().sendSuccess(() -> Component.literal("Profiles=" + SpawnControlStore.document().profiles.size()
                + ", validation issues=" + issues.size()), false);
        issues.stream().limit(20).forEach(issue -> context.getSource().sendSuccess(() -> Component.literal("- " + issue), false));
        return issues.isEmpty() ? 1 : 0;
    }

    private static int stats(CommandContext<CommandSourceStack> context) {
        context.getSource().sendSuccess(() -> Component.literal(SpawnCounterService.describe()), false);
        context.getSource().sendSuccess(() -> Component.literal(SpawnDiagnostics.describe()), false);
        return 1;
    }

    private static int explain(CommandContext<CommandSourceStack> context) {
        SpawnProfile profile = profile(context);
        if (profile == null) return 0;
        String result = SpawnScheduler.explain(context.getSource().getLevel(), profile,
                net.minecraft.core.BlockPos.containing(context.getSource().getPosition()));
        for (String line : result.split("\\n")) {
            context.getSource().sendSuccess(() -> Component.literal(line), false);
        }
        return 1;
    }

    private static int spawnTest(CommandContext<CommandSourceStack> context) {
        SpawnProfile profile = profile(context);
        if (profile == null) return 0;
        ServerPlayer player = null;
        try {
            player = context.getSource().getPlayerOrException();
        } catch (com.mojang.brigadier.exceptions.CommandSyntaxException ignored) {
        }
        SpawnAttemptResult result = SpawnScheduler.spawnTest(context.getSource().getLevel(), profile,
                net.minecraft.core.BlockPos.containing(context.getSource().getPosition()), player);
        if (result.success()) context.getSource().sendSuccess(() -> Component.literal("Spawn test PASS: " + result.reason()), true);
        else context.getSource().sendFailure(Component.literal("Spawn test FAIL: " + result.reason()));
        return result.success() ? 1 : 0;
    }

    private static int clear(CommandContext<CommandSourceStack> context, String profileId) {
        int removed = SpawnCounterService.clearGenerated(context.getSource().getServer(), profileId);
        context.getSource().sendSuccess(() -> Component.literal("Removed " + removed + " generated entities."), true);
        return removed;
    }

    private static SpawnProfile profile(CommandContext<CommandSourceStack> context) {
        String id = StringArgumentType.getString(context, "profile");
        SpawnProfile profile = SpawnControlStore.document().findProfile(id);
        if (profile == null) context.getSource().sendFailure(Component.literal("Unknown profile: " + id));
        return profile;
    }
}
