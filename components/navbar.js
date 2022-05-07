import { useRouter } from 'next/router'
import Link from 'next/link'
import cookie from "cookie"

export default function Navbar({user}) {
    const router = useRouter();
    if(router.pathname != "/login" && user){
        return (
            <>
                <nav className="nav">
                    <div className="container">
                        <div id="mainListDiv" className="main_list">
                            <ul className="navlinks">
                                <li className={router.pathname == "/" ? "active" : ""}><Link href="/">Home</Link></li>
                                <li className={(router.pathname == "/conferenceroom" || router.pathname == "/conferenceroom/[roomId]")  ? "active" : ""}><Link href="/conferenceroom">Conference Rooms</Link></li>
                                <li className={router.pathname == "/timeslots" ? "active" : ""}><Link href="/timeslots">Book Slot</Link></li>
                                <li className={router.pathname == "#" ? "active" : ""}><Link href="#">Booking Status</Link></li>
                                { user ?<li className={router.pathname == "/" ? "active" : ""}><Link href="/logout">Logout</Link></li> :
                                <li className={router.pathname == "/login" ? "active" : ""}><Link href="/login">Login</Link></li> }
                            </ul>
                        </div>
                    </div>
                </nav>
            </>
        )
    }else{
        return <></>
    }
    
    
  }
