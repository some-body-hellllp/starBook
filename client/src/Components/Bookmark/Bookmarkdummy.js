// 더미 데이터 생성
const dummyPosts = [
  {
    title: "담담책방",
    content: "책 좋아하는 1인, 대구여행 중, 독립서점 더폴락~~ 커피도 마시고 책도 구매완료~~^^",
    author: "저자1",
    imageUrl: "https://search.pstatic.net/common/?src=https%3A%2F%2Fpup-review-phinf.pstatic.net%2FMjAyNDA3MzFfMjk3%2FMDAxNzIyNDE4MjY4Njc4.KIDLFUdEQEOUwNuKCYeTtLYSsGThAiF2Zz5g7YHbuFcg.kDCq1LfFXXMIwi8Jz5RKp5WAqdi_TYLPmuzpYsHMFC0g.JPEG%2F20240731_133050.jpg.jpg%3Ftype%3Dw1500_60_sharpen",
  },
  {
    title: "담담책방",
    content: "흥미로운 책들도 많고 잔잔하고 고요하게 잘 쉬다 왔어요~ 야외에 앉는다고 사장님께서 모기 퇴치제도 챙겨 주시고 친절 하셔요:)",
    author: "저자2",
    imageUrl: "https://search.pstatic.net/common/?src=https%3A%2F%2Fpup-review-phinf.pstatic.net%2FMjAyNDA3MzFfMTAw%2FMDAxNzIyNDE4MjgwNDI3.8OLi0ak3DRnGxR1gY2jiY76licrfJzauZb4igG3x7ksg.77dkcJJBjpUnUXXKDFGwLt0ddUZSa1iIXqgHizH5nEsg.JPEG%2F20240731_133112.jpg.jpg%3Ftype%3Dw1500_60_sharpen",
  },
  {
    title: "더폴락",
    content: "관심있어했던 책이 매장에 있어서 좋았고 편안하게 구경하기 좋았습니다!",
    author: "저자3",
    imageUrl: "https://search.pstatic.net/common/?src=https%3A%2F%2Fpup-review-phinf.pstatic.net%2FMjAyNDA3MzFfMTAg%2FMDAxNzIyNDE4Mjc3NTMy.-d8ram6Sq5QTiwVaYQy4OFU-pgT--nBL5npi-mC4u3Eg.cL2zAiuDbbmaBR-PUxUczY5QB1UIDwP0yU8ChBTMdsAg.JPEG%2F20240731_133323.jpg.jpg%3Ftype%3Dw1500_60_sharpen",
  },
  {
    title: "담담책방",
    content: "북아트페어때 봤는데 티셔츠 디자인이 귀여워서 구매했어요 사이즈도 잘 맞고 좋네요 다음번엔 책을 구매할게요!",
    author: "저자4",
    imageUrl:
      "https://search.pstatic.net/common/?src=https%3A%2F%2Fpup-review-phinf.pstatic.net%2FMjAyNDA4MTBfMjk5%2FMDAxNzIzMjUyNjM5NTQ3.im7tMF4d77Zjbti-ZTNlKNBcBdXggrQbdK7llGVWvjEg.2XclfQUFpXcCtk8ygiW5yIERE5wAcf9Y8e0V0Vp4-eAg.JPEG%2F9DD46B23-6107-4E97-89EB-8B87B053F723.jpeg%3Ftype%3Dw1500_60_sharpen",
  },
  {
    title: "고스트북",
    content: "골목을 돌고돌아 찾아낸 책방ㅎㅎ 시원한 아메리카노 한잔에 읽고싶은 책 한권 사서 읽으며 시간 가는줄 모르고 머물렀던 힐링 쉼터~!",
    author: "저자5",
    imageUrl:
      "https://search.pstatic.net/common/?src=https%3A%2F%2Fpup-review-phinf.pstatic.net%2FMjAyNDA4MTBfODYg%2FMDAxNzIzMjUyNjM5NTk1.9ApYsJH78qTPmfh63zpKj26Uu40Zl4SSucmIxjANTTUg.bNexEd27JS3yzrFEMqmvaXEqHELWUfNv3uYlp2IcZcYg.JPEG%2F71957742-51E7-4213-8751-1F3DF6D85FE9.jpeg%3Ftype%3Dw1500_60_sharpen",
  },
  {
    title: "더폴락",
    content: "좁지 않은 공간인데 아늑한 느낌이 들어요~ 독립서적 일반서적 다양하게 있어서 책 구경하고 고르는 재미도 쏠쏠합니다!",
    author: "저자6",
    imageUrl:
      "https://search.pstatic.net/common/?src=https%3A%2F%2Fpup-review-phinf.pstatic.net%2FMjAyNDExMzBfMTE2%2FMDAxNzMyOTc0ODAzNjEw.LH_1R4nuCTDLeISsAdyhNadgDRYSi7RYXtLfzH0bgekg.0cPOPuru3upqydsbEQ3lLAAa78SIWKoVRixJ6yv5TqEg.JPEG%2FA1B706F9-449F-4610-A09B-E89DE6D771AD.jpeg%3Ftype%3Dw1500_60_sharpen",
  },
  {
    title: "더폴락",
    content: "책과 고양이 완벽",
    author: "저자7",
    imageUrl: "https://search.pstatic.net/common/?src=https%3A%2F%2Fpup-review-phinf.pstatic.net%2FMjAyNDEyMThfNjcg%2FMDAxNzM0NTA5OTIzMTk3.VZpmPxSAoiXG8GwAwv8IBz2_Q8RM2_rj5HganGO2vwAg.5cia209sa3Q_y11CkpAC90NUuymXwq-Yso2ji7Dsm3Ug.JPEG%2F1000025586.jpg.jpg%3Ftype%3Dw1500_60_sharpen",
  },
  {
    title: "고스트북",
    content: "고양이와 함께 분위기 있는 곳이라 넘 힐링 그자체였어요♡ 혼자가도 넘 좋고 따뜻한 돌만지면서 체온 유지하는 것도 신기했고 책 종류도 다양해서 좋았어용ㅎㅎ",
    author: "저자8",
    imageUrl:
      "https://search.pstatic.net/common/?src=https%3A%2F%2Fpup-review-phinf.pstatic.net%2FMjAyNDA4MjhfMTU3%2FMDAxNzI0ODM3NjA3NTgy.nr432KPV6CNTkWlLcq9uDixXoE7dC0RVQOLQW2-rvo4g.ipUCULuKIG1GfpMFIi_AOosCRDpnakih9u0wI42T25gg.JPEG%2FF7BE405D-D11D-46A9-A44C-F4F408978F1E.jpeg%3Ftype%3Dw1500_60_sharpen",
  },
  {
    title: "고스트북",
    content: "대구 여행 가서 감성 책방이 있다고 해서 방문하게 되었습니다! 매장이 넓진 않으나 아늑하였고, 독특한 책들도 많았습니다! 다가오는 크리스마스에 맞춰 크리스마스 서적 구매했습니다! 덕분에 대구에서 기분좋은 추억 만들어서 갑니다!",
    author: "저자9",
    imageUrl:
      "https://search.pstatic.net/common/?src=https%3A%2F%2Fpup-review-phinf.pstatic.net%2FMjAyMzEwMTVfMTA1%2FMDAxNjk3Mzc4MzE4ODcz.7SNGLZ4Q0lLYSWntJgj2uto1Yhhrr7QuAcfwqmlqux4g.jD1uLxW474X3vk6HbqCxYywSKBL4kUlwYRFkKCvZBskg.JPEG%2FC8B2D528-BAE2-4523-9A9D-F00660B044DE.jpeg%3Ftype%3Dw1500_60_sharpen",
  },
  {
    title: "고스트북",
    content: "감성 뿜뿜 일러스트 굿즈에 읽고싶은 책을 보물찾기 하는 재미가 있는 책방~^-^",
    author: "저자10",
    imageUrl: "https://search.pstatic.net/common/?src=https%3A%2F%2Fpup-review-phinf.pstatic.net%2FMjAyMzA4MjdfMzYg%2FMDAxNjkzMTA1NDU2ODgy.OgCWYNNoq8Qn_FBO7xl_wKFitbTldPc4P4pj61yhr9Ig.Zm_euWrY6QHH-yUq_U1EdTvpJLrllUR2Bp_1YEKv8qog.JPEG%2F20230817_140741.jpg.jpg%3Ftype%3Dw1500_60_sharpen",
  },
];

export default dummyPosts;
