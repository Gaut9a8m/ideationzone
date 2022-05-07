import Slots from "./timeslots"
import Room from './conferenceroom'
import Router from 'next/router'


export default function Home({user}) {
 
  if (user) {
    return (
      <>

        <div>
          <div className="d-flex">
            <div className="container-fluid martop">
              <div className="row text-center">
                <h1 className="my-2">Dashboard</h1>
                <hr className="heading-dash" />
              </div>
              <div className="row">
                <div className="d-flex">
                  <div>
                  </div>
                  <div>
                    <Room user={user} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }


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
        destination: '/login',
        permanent: false
      },
    }
  }
}