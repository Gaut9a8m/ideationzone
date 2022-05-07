import Link from "next/link";
import cookie from "cookie"


export default function Room({ user, rooms }) {
  return (
    <>
       <div>
          <div className="d-flex">
            <div className="container-fluid martop">
              <div className="row text-center">
                <h1 className="my-2">Conference Rooms</h1>
                <hr className="heading-dash" />
            </div>
            <div className="row my-4">
              <div className="listing" style={{ width:"50%", margin:"auto", overflow:"scroll", height:"38rem"}}>
                {rooms ? rooms.map((room, index) => (
                  <div key={room.id} className="content">
                    
                    <h3 className="title">
                    {room.id}. <Link href={`conferenceroom/${room.id}`}>{room.name}</Link>
                    </h3>
                    <h4 className="beds">
                    {room.capacity} Capacity {room.projector ? <span>| 1 Projector</span>: <></>}      {room.white_board ? <span>| 1 White Board</span>: <></>}
                  </h4>
                    <p className="description">
                      {room.description}
                    </p>
                    {room.is_active ? <p className="price">
                      Active
                    </p>: <p className="price">
                      Maintainance
                    </p>}
                    {room.vacant ?<p className="availability">
                      Available
                    </p> : <p className="engaged"> Engaged </p> }
                  </div>

                )) : <p>Loading...</p>}

              </div>
            </div>
      </div>
      </div>
    </div>
    </>
  )
}

export async function getServerSideProps({ req, res }) {
  const cookies = req.cookies ? req.cookies : {};
  console.log('conference room', cookies)
  if (cookies["ideationzone"]) {
    const res_room = await fetch(`${process.env.backend}conference_rooms/`);
    const res_data = await res_room.json();
    if (res_room.status == 200) {
      return {
        props: {
          rooms: res_data,
          user: cookies["ideationzone"]

            }
          }
      } else {
        return {
          props: {
            rooms: [],
            user: cookies["ideationzone"]
          }
        }
      }
        
  }else {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
        // statusCode: 301
      },
    }
  }
}