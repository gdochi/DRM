---
title: 설치 준비
slug: installation
order: 30
description: DRM Core 문서에서 전제하는 모드와 환경 구성입니다.
product: core
category: 시작하기
status: 안정
version: 0.1.x
audience: 서버 운영자
tags:
  - install
  - forge
---

## 기본 전제

DRM 문서는 Forge 기반 CustomNPCs 작업 환경을 기준으로 작성합니다. 실제 서버에 넣기 전에는 같은 모드 구성의 테스트 인스턴스를 따로 두는 편이 안전합니다.

| 항목 | 역할 | 확인 |
| --- | --- | --- |
| DRM | 런타임 기능과 데이터 해석을 담당합니다. | 모드 목록과 로그 |
| CustomNPCs | NPC, 스크립트, 데이터 폴더를 제공합니다. | `customnpcs` 폴더 |
| CNPCExtended | HTML GUI와 확장 기능을 사용합니다. | GUI 호출 테스트 |
| MCEF | 게임 안 브라우저 화면을 표시합니다. | 에디터 화면 |

## 클라이언트와 서버

- 싱글플레이는 클라이언트 인스턴스만 맞추면 됩니다.
- 멀티 서버는 서버와 접속 클라이언트의 모드 구성이 맞아야 합니다.
- GUI 리소스나 이미지가 리소스팩에 있다면 클라이언트에도 전달되어야 합니다.
- 운영 서버에서는 테스트 월드에서 JSON을 검수한 뒤 배포 월드로 옮깁니다.

## 업데이트 기준

큰 버전 변경 전에는 `customnpcs` 폴더와 월드의 `customnpcs` 폴더를 백업합니다. 특히 GUI, 대화, 상점 JSON은 서로 경로와 ID로 연결되므로 일부 파일만 새 버전으로 바꾸면 연결이 깨질 수 있습니다.
