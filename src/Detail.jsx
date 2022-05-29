//Detail.js
// 리액트 패키지를 불러옵니다.
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
// redux hook을 불러옵니다.
import { useDispatch, useSelector } from "react-redux";
// 내가 만든 액션 생성 함수를 불러옵니다.
import {deleteBucketFB} from "./redux/modules/bucket";

const Detail = (props) => {
    const dispatch = useDispatch();
		const navigate = useNavigate();
    const params = useParams();

    //console.log(params)
    const bucket_index = params.index;
    
  // 스토어에서 상태값 가져오기
  const bucket_list = useSelector((state) => state.bucket.list);
  // url 파라미터에서 인덱스 가져오기
  console.log(bucket_list[bucket_index])
  return (
    <div>
      <p>{bucket_list[bucket_index].text}</p>
      <button
        onClick={() => {
          dispatch(deleteBucketFB(bucket_list[bucket_index].id));
          navigate('/');
        }}
      >
        삭제하기
      </button>
    </div>
  );
};

export default Detail;