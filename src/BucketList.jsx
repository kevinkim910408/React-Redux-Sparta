// 리액트 패키지를 불러옵니다.
import React from "react";
import styled from "styled-components";

import { useNavigate } from "react-router-dom";
// redux 훅 중, useSelector를 가져옵니다.
import { useSelector } from "react-redux";

const BucketList = (props) => {
  let navigate = useNavigate();
  //   이 부분은 주석처리!
  //   console.log(props);
  //   const my_lists = props.list;
  // 여기에서 state는 리덕스 스토어가 가진 전체 데이터예요.
  // 우리는 그 중, bucket 안에 들어있는 list를 가져옵니다.
  const my_lists = useSelector((state) => state.bucket.list);
  console.log(my_lists)
  const lists = my_lists.map((value, index)=> <ItemStyle className="list_item" key={index} onClick={()=> {navigate("/detail/"+index)}}>{value.text}</ItemStyle>)
  console.log(lists)
  return (
    <ListStyle>
      {lists}
      
    </ListStyle>
  );
};

const ListStyle = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
`;

const ItemStyle = styled.div`
  padding: 16px;
  margin: 8px;
  background-color: aliceblue;
`;

export default BucketList;