import { useState, useEffect, SetStateAction } from "react";
import Cookies from "js-cookie";

interface reservation {
    reservationId:string
    roomModel:roomsInterface
    seatNumber:number
    userModel:userInterface
    startTime:Date
    endTime:Date
}

interface roomsInterface {
    roomId:string;
    roomType:string;
    seatList:number[];
  }

  interface userInterface {
    userId:string;
    phoneNumber:string;
    password:string;
    name:string;
    tokenModel:object;
    permission:string;
    createAt:Date;
    updateAt:Date;
  }

export default function admin() {
    const [reservationList, setReservation] = useState<reservation[]>([]);
    let accessToken : string = String(Cookies.get("accessToken"));

    useEffect(() => {
        const requestUrl = "http://localhost:8080/admin/reservation";
  
        fetch(requestUrl, {
          method: "Get",
          headers: {
            'Authorization' : `Bearer ${accessToken}`
          },
      }).then(response => response.json())
      .then(data => {
        setReservation(data.data);
      })
      }, [])

      const deleteReservation = (id:any) => {
        console.log(id);
        fetch(`http://localhost:8080/admin/reservation?id=${id}`, {
            method: "Delete",
            headers: {
              'Authorization' : `Bearer ${accessToken}`
            },
        }).then((response) => {
          console.log(response);
            fetch("http://localhost:8080/admin/reservation",{
                method: "Get",
                headers: {
                  'Authorization' : `Bearer ${accessToken}`
                },
            }).then(response => response.json())
            .then(data => {
              setReservation(data.data);
            })
        })
      }

      return (
        <div className="My">
            <table>
            <tr>
                <th>유저</th>
                <th>룸타입</th>
                <th>좌석번호</th>
                <th>시작시간</th>
                <th>종료시간</th>
                <th>삭제</th>
            </tr>
            {reservationList.map((reservation:reservation,index) => (
                <tr>
                    <td>{reservation.userModel.phoneNumber}</td>
                    <td>{reservation.roomModel.roomType}</td>
                    <td>{reservation.seatNumber}</td>
                    <td>{String(reservation.startTime)}</td>
                    <td>{String(reservation.endTime)}</td>
                    <td><button onClick={() => {deleteReservation(reservation.reservationId)}}>삭제</button></td>
                </tr>
            ))}</table>
        </div>
      );
}