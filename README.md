# 나혼자 잘산다

1인 가구를 위한 냉장고, 장보기, 정산, 집안일 관리 앱입니다.

## 로컬 실행

```sh
npm install
npm run dev
```

Gemini 기능을 사용하려면 `.env`에 `GEMINI_API_KEY`를 설정하세요. 키 없이도 앱의 기본 기능과 오프라인 레시피를 사용할 수 있습니다.

## 배포

이 저장소는 `render.yaml` Blueprint를 포함합니다. Render에서 **New > Blueprint**를 선택하고 이 저장소를 연결하면 웹 서비스를 만들 수 있습니다. AI 레시피와 영수증 분석 기능에는 Render 서비스의 `GEMINI_API_KEY` 환경 변수 설정이 필요합니다.

## 빌드

```sh
npm run build
```
