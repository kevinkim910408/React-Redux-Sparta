import {
  collection,
  getDocs,
  addDoc,
  doc, 
  deleteDoc,
} from "firebase/firestore";

import {db} from "../../firebase-config";

// 액션 타입을 정해줍니다.
const CREATE = "bucket/CREATE";
const DELETE = "bucket/DELETE";
const LOAD = "bucket/LOAD";

// 초기 상태값을 만들어줍니다.
const initialState = {
  list: [],
};

// 액션 생성 함수
function loadBucket(bucket_list){
  return {type: LOAD, bucket_list};
}

// 액션 생성 함수예요.
// 액션을 만들어줄 함수죠!
function createBucket(bucket){
  console.log("액션을 생성할거야!");
    return {type: CREATE, bucket: bucket};
}
// 데이터를 지우는 액션함수
function deleteBucket(bucket_index){
  console.log("지울 버킷 인덱스", bucket_index);
  return {type: DELETE, bucket_index};
}

// 파이어베이스랑 통신하는 부분
// 데이터를 로딩한다
export const loadBucketFB = () => {
  return async function (dispatch) {
    // "bucket" 컬렉션 안에있는 데이터를 getDocs로 가져와서 변수에 저장
    const bucket_data = await getDocs(collection(db, "bucket"));

    let bucket_list  = []; // db에서 가져온 데이터들을 배열로 관리

    bucket_data.forEach((doc) => { // foreach를 돌면서 데이터들을 아까 만든 빈 배열에 넣는다
      // 콘솔로 확인해요!
      bucket_list.push({ id: doc.id, ...doc.data() }); // id 는 삭제를 위해 가져옴, data()에 있는게 우리가 원하는 진짜 데이터집합체
    });
    // loadBucket에 아까 만든 bucket_list를 로딩해줄거다 - dispatch로 부를 친구임
    dispatch(loadBucket(bucket_list));
  }
}


// 추가 FB
export const addBucketFB = (bucket) => {
  return async function (dispatch) {
		// 파이어스토어에 추가하기를 기다려요!
    const docRef = await addDoc(collection(db, "bucket"), bucket);
		// 추가한 데이터 중 id를 가져와서 bucket_data를 만들어줬어요!
    const bucket_data = { id: docRef.id, ...bucket };
		// 그럼 이제 액션을 일으키자! (수정해달라고 요청하자!)
    dispatch(createBucket(bucket_data));
  }
}

export const deleteBucketFB = (bucket_id) => {
  return async function (dispatch, getState) {
    if(!bucket_id){
      window.alert("아이디가 없네요!");
      return;
    }
    const docRef = doc(db, "bucket", bucket_id);
    await deleteDoc(docRef);

     const _bucket_list = getState().bucket.list;
     const bucket_index = _bucket_list.findIndex((b) => {
       return b.id === bucket_id;
     });

     dispatch(deleteBucket(bucket_index));
  }
}

// 리듀서예요.
// 실질적으로 store에 들어가 있는 데이터를 변경하는 곳이죠!
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:{
      return {list: action.bucket_list}
    }
    case CREATE: {
        console.log("이제 값을 바꿀거야!");
        const new_bucket_list = [...state.list, action.bucket];
        return {list : new_bucket_list};
    }

    case DELETE: {
      const new_bucket_list = state.list.filter((l, idx) => {
        return parseInt(action.bucket_index) !== idx;
      });
  
     return {list: new_bucket_list};
    }
    default:
      return state;
  }
}