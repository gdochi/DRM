# DRM Docs

GitHub Pages용 DRM 문서 사이트입니다.

## 문서 수정

평소에는 `content/ko/*.md` 파일을 수정하면 됩니다.

```bash
npm.cmd run dev
```

로 로컬 미리보기를 열고, 저장 후 화면을 확인합니다.

## 빌드

```bash
npm.cmd run build
```

빌드 결과는 `dist/`에 생성됩니다. GitHub Pages 배포는 `.github/workflows/pages.yml`에서 처리합니다.

## 저장소 주의

현재 폴더가 `DRM.wiki.git` 원격에 연결되어 있다면 GitHub Actions/Pages 배포용 일반 저장소로 원격을 바꿔야 합니다.
