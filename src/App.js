import React, { useEffect } from "react";
import styled from "styled-components";
import { Route, Routes } from "react-router-dom";
// useDispatch를 가져와요!
import {useDispatch} from "react-redux";
// BucketList 컴포넌트를 import 해옵니다.
// import [컴포넌트 명] from [컴포넌트가 있는 파일경로];
import BucketList from "./BucketList";
import Detail from "./Detail";

// import {db} from './firebase-config'
// import { collection, getDoc, getDocs, addDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";

import {loadBucketFB, addBucketFB} from './redux/modules/bucket'

function App() {
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(loadBucketFB());
    // async function fetchData(){
    //     const query = await getDocs(collection(db, 'words'));
    //     //console.log(query);
    //     query.forEach((doc) => {
    //     console.log(doc.id, doc.data());
    //   });
    // }
    // fetchData();

    // async function addData(){
    //   const docRef = await addDoc(collection(db, 'words'), {
    //     description: "귀여워",
    //     example: "700! 700!",
    //     name: "700"
    //   })
    // }
    // addData();

    // async function updateData(){
    //   const docRef = doc(db, "words", "ZMl0Si1lf23DASKG6faz");
    //     await updateDoc(docRef, {
    //     description: "레게노야 레게노!",
    //   });
    // }
    // updateData();

    // async function deleteData(){
    //   const docRef = doc(db, "words", "ZMl0Si1lf23DASKG6faz");
    //   await deleteDoc(docRef);
    // }
    // deleteData();
  },[dispatch])
  
  const textRef = React.useRef(null);
  // useHistory 사용하는 것과 비슷하죠? :)
  

 

  const addBucketList = () => {
    //dispatch(createBucket(text.current.value));
    dispatch(addBucketFB({ text: textRef.current.value, completed: false }));
  };
  
  return (
    <div className="App">
      <Container>
        <Title>내 버킷리스트</Title>
        <Line />
        {/* 컴포넌트를 넣어줍니다. */}
        {/* <컴포넌트 명 [props 명]={넘겨줄 것(리스트, 문자열, 숫자, ...)}/> */}
        <Routes>
          {/* <Route
            path="/"
            exact
            render={(props) => <BucketList list={list} />}
          /> */}
          {/* 이제는 render를 사용해서 list를 넘겨줄 필요가 없죠! 버킷리스트가 리덕스에서 데이터를 알아서 가져갈거니까요! */}
          <Route path="/" element={<BucketList />} />
          <Route path="/detail/:index" element={<Detail />} />
        </Routes>
      </Container>
      {/* 인풋박스와 추가하기 버튼을 넣어줬어요. */}
      <Input>
        <input type="text" ref={textRef} />
        <button onClick={addBucketList}>추가하기</button>
      </Input>
    </div>
  );
}

const Input = styled.div`
  max-width: 350px;
  min-height: 10vh;
  background-color: #fff;
  padding: 16px;
  margin: 20px auto;
  border-radius: 5px;
  border: 1px solid #ddd;
`;

const Container = styled.div`
  max-width: 350px;
  min-height: 60vh;
  background-color: #fff;
  padding: 16px;
  margin: 20px auto;
  border-radius: 5px;
  border: 1px solid #ddd;
`;

const Title = styled.h1`
  color: slateblue;
  text-align: center;
`;

const Line = styled.hr`
  margin: 16px 0px;
  border: 1px dotted #ddd;
`;

export default App;