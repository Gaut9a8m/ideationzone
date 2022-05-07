

export default function Slots({ user, slots }) {
  console.log('maxppx ', slots)
  return (
    <>
      <div>
        <div className="d-flex">
          <div className="container-fluid martop">
            <div className="row text-center">
              <h1 className="my-2">Schedule</h1>
              <hr className="heading-dash" />
            </div>
            <div className="container my-5">
              {/* <div className="row">
                <div className="col-md-12 text-center">
                  <span className="text-uppercase" style={{color: "#9b5de5"}}>schedule</span>
                  <h2 className="text-capitalize font-weight-bold">event schedule</h2>
                </div>
              </div> */}
              <div className="row my-5">
                <div className="col-lg-12 col-md-12 col-sm-12 my-sm-3" style={{ overflowY:"scroll", maxHeight:"400px", margin:"auto", width:"60%"}}>
                  {slots ? slots.map((slot, index) => (
                    <>
                    <div className="d-flex align-items-center" style={{ margin: "auto"}}>
                      
                      <div style={{ width: "50%" }}>
                        <h4 className="font-weight-bold" style={{ color: "#03E9F4" }}>{slot.start_time} : {slot.end_time}</h4>
                      </div>
                      
                      <div style={{ width: "100%" }}>
                        <small className="text-secondary" style={{ fontSize: "1.2rem" }}>{slot.booking_date} {slot.booking_day}</small>
                        <h6 style={{ fontSize: "1.7rem" }}>{slot.meet_agenda}</h6>
                      </div>
                    </div>
                    <hr className="row-dash" />
                    </>
                  )) : <div className="d-flex flex-column align-items-center">
                    <p className="nofound">No Record Found.</p>
                    <Link href="/conferenceroom"><a className="tcolor" style={{ fontSize: "1.6rem" }}>Back</a></Link>
                  </div>}
                </div>

              </div>
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
    const res = await fetch(`${process.env.backend}slot/`);
    const data = await res.json();
    if (res.status === 200) {
      return {
        props: {
          slots: data.data,
          user: cookies["ideationzone"]
        }
      }
    } else {
      return {
        props: {
          slots: [],
          user: cookies["ideationzone"]
        }
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