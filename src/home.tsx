import Cookies from "js-cookie";
import { useState, useEffect, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker, { ReactDatePickerProps } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { setHours, setMinutes, addDays, add } from 'date-fns';

interface roomsInterface {
    roomId:string;
    roomType:string;
    seatList:number[];
}

export default function home() {
    const [rooms, setRooms] = useState<roomsInterface[]>([]);
    const [roomTypeIndex , setRoomTypeIndex] = useState(-1);
    const [roomType, setRoomType] = useState('');
    const [seatNumberList, setSeatNumberList] = useState<number[]>([]);
    const [seatNumber, setSeatNumber] = useState<number>(1);
    const [startDate, setStartDate] = useState<Date>(setHours(setMinutes(new Date(), 0), 9));
    const [endDate, setEndDate] = useState<Date>(setHours(setMinutes(new Date(), 0), 9));
    let accessToken : string = String(Cookies.get("accessToken"));

    const minTime = setHours(setMinutes(new Date(), 0), 9);

    const maxTime = setHours(setMinutes(new Date(), 0), 20);

    const today = new Date();
    const nextWeek = addDays(new Date(), 7);

    const navigate = useNavigate();

    useEffect(() => {
      const requestUrl = "http://localhost:8080/room/list";

      console.log(accessToken);
      fetch(requestUrl, {
        method: "Get",
        headers: {
          'Authorization' : `Bearer ${accessToken}`
        },
    }).then(response => response.json())
    .then(data => {
      setRooms(data.data)
    })
    }, [])

    useEffect(() => {
      if(roomTypeIndex !== -1) {
        setSeatNumberList(rooms[roomTypeIndex].seatList);
      }
    }, [roomTypeIndex])

    const selectRoomType = (event: { target: { value: SetStateAction<string>; }; }) => {
      setRoomTypeIndex(Number(event.target.value));
      setRoomType(rooms[Number(event.target.value)].roomType);
    }

    const selectSeatNumber = (event: { target: { value: SetStateAction<string>; }; }) => {
      setSeatNumber(Number(event.target.value));
    }

    const selectDate: ReactDatePickerProps['onChange'] = (date: Date) => {
      setStartDate(date);
      console.log(date);
    }

    const selectEndDate = (event: { target: { value: SetStateAction<string>; }; }) => {
      setEndDate(add(startDate, {hours:Number(event.target.value)}));
    }

    const goMypage = () => {
      navigate("/mypage")
  }

    const reservation = () => {
      const requestUrl = "http://localhost:8080/reservation";
      fetch(requestUrl, {
        method: "Post",
        headers: {
          'Authorization' : `Bearer ${accessToken}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          roomType: roomType,
          seatNumber: seatNumber,
          startTime: startDate,
          endTime: endDate
        }),
    }).then(response => response.text())
    .then(data => console.log(data));
    }


    return (
      <div className="Home">
        roomType
        <select onChange={selectRoomType}>
          {rooms.map((room:roomsInterface,index) => (
            <option key={index} value={index}>{room.roomType}</option>
          ))}
        </select><br></br>
        seatNumber
        <select onChange={selectSeatNumber}>
          {seatNumberList.map((seat:number,index) => (
            <option key={index} value={seat}>{seat}</option>
          ))}
        </select><br></br>
        startDate
        <DatePicker
          selected={startDate}
          onChange={selectDate}
          showTimeSelect
          dateFormat="Pp"
          minTime={minTime}
          maxTime={maxTime}
          timeIntervals={60}
          minDate={today}
          maxDate={nextWeek}
        /><br></br>
        endTime
        <select  onChange={selectEndDate}>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
      </select><br></br>
      <button onClick={reservation}>예약</button>
      <button onClick={goMypage}>마이페이지</button>
      </div>
    );
  }