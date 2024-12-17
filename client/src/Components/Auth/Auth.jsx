import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import getKakaoLogin from "../../function/getKakaoLogin";

export default function Auth() {
  const navigate = useNavigate();
  const code = new URL(window.location.href).searchParams.get("code") || null;

  useEffect(() => {
    // `code` 값이 없으면 잘못된 접근으로 리디렉션
    if (code === null) {
      alert("잘못된 접근입니다");
      setTimeout(() => {
        navigate(`/`);
      }, 0);
    }
    getKakaoLogin(code); // 카카오 로그인 함수 호출
  }, []);

  return <div>처리 중...</div>;
}
