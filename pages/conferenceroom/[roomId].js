import Link from "next/link";
import { useRouter } from "next/router"
import { useState, useEffect } from "react"
import { toast, ToastContainer } from 'react-nextjs-toast'

export default function RoomId({ user }) {
    const router = useRouter();
    const [roomData, setroomData] = useState(null);
    const [roomId, setroomId] = useState(null);
    const [roomPath, setroomPath] = useState(null);
    useEffect(() => {
        if (router.query.roomId) {
            fetchRoom(router.query.roomId, setroomData);
            setroomId(router.query.roomId);
        }
    }, [router.query.roomId])

    return (
        <>
            <ToastContainer align={"right"} position={"bottom"} id="toast-comp-3"/>
            <div>
                <div className="d-flex">
                    <div className="container-fluid martop">
                        <div className="row text-center">
                            {roomData ? <><h1 className="my-2">{roomData.name} Room</h1> 
                                        <hr className="heading-dash" /></>
                            : <h1 className="my-2"></h1> }
                        </div>
                        <div className="row my-3" style={{ width: "50%", margin: "auto" }}>
                            {roomData ?
                                <>
                                    <form onSubmit={(e) => updateRoomData(e, user, roomId, setroomData, setroomPath)}>
                                        <div className="row">
                                            <div className="d-flex flex-column justify-content-center">
                                                <div className="row">
                                                    <div className="col-md-6 room">
                                                        <input type="text" name="name" placeholder="Name" defaultValue={roomData.name} />
                                                    </div>
                                                    <div className="col-md-6 room">
                                                        <input type="number" name="capacity" placeholder="Surname" defaultValue={roomData.capacity} />
                                                    </div>
                                                </div>


                                                <div className="row">
                                                    <div className="col-md-3 room">
                                                        <label>Projector: </label>
                                                        <select name="projector">
                                                            <option value="true">True</option>
                                                            <option value="false">False</option>
                                                        </select>

                                                    </div>

                                                    <div className="col-md-3 room">
                                                        <label>White Board: </label>
                                                        <select name="board">
                                                            <option value="true">True</option>
                                                            <option value="false">False</option>
                                                        </select>
                                                    </div>
                                                    <div className="col-md-3 room">
                                                        <label>Vacant: </label>
                                                        <select name="vacant">
                                                            <option value="true">True</option>
                                                            <option value="false">False</option>
                                                        </select>
                                                    </div>
                                                    <div className="col-md-3 room">
                                                        <label>Maintainance: </label>
                                                        <select name="isActive">
                                                            <option value="true">True</option>
                                                            <option value="false">False</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="small-12 columns room">
                                                        <textarea name="description" placeholder="Description" defaultValue={roomData.description}></textarea>
                                                    </div>
                                                </div>
                                                <div className="row ">
                                                    <div className="col-md-6">
                                                        <button type="submit" style={{width:"100%"}} className="btn btn-danger">Update</button>
                                                    </div>
                                                    <div className="col-md-6">
                                                    <Link href="/conferenceroom"><button type="button" style={{width:"100%"}} className="btn btn-warning">Back</button></Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                    {roomPath ? <span>Updated... </span> : <></>}
                                </>

                                :
                                <div className="d-flex flex-column align-items-center">
                                    <p className="nofound">No Record Found.</p>
                                    <Link href="/conferenceroom"><a className="tcolor" style={{fontSize:"1.6rem"}}>Back</a></Link>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}



export const getServerSideProps = async ({ req, res }) => {
    const cookies = req.cookies ? req.cookies : {};
    if (cookies["ideationzone"]) {
        return {
            props: {
                user: cookies["ideationzone"]
            }
        }
    }
    else {
        return {
            redirect: {
                destination: '/',
                permanent: false,
                // statusCode: 301
            },
        }
    }
}

const fetchRoom = async (roomId, setroomData) => {
    const res = await fetch(`${process.env.backend}conference_rooms/${roomId}`);
    const data = await res.json();

    if (res.status === 200) {

        setroomData(data);

    }
}

const updateRoomData = async (e, user, roomId, setroomData, setroomPath) => {
    e.preventDefault();
    const body = {
        "name": e.target.name.value,
        "description": e.target.description.value,
        "capacity": e.target.capacity.value
    }
    if (e.target.projector.value == "true") {
        body["projector"] = true;
    } else {
        body["projector"] = false;
    }
    if (e.target.board.value == "true") {
        body["white_board"] = true;
    } else {
        body["white_board"] = false;
    }
    if (e.target.vacant.value == "true") {
        body["vacant"] = true;
    } else {
        body["vacant"] = false;
    }
    if (e.target.isActive.value == "true") {
        body["is_active"] = true;
    } else {
        body["is_active"] = false;
    }

    const res = await fetch(`${process.env.backend}conference_rooms/${roomId}`, {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await res.json();

    if (res.status === 200) {

        setroomData(data);
        setroomPath(`/conferenceroom/${roomId}`);    

    } else {
        alert("something went wrong")
    }
}