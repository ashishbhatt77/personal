import { ContextApi } from "./ContextApi";


function MyOrders() {
    const{loginname}=useContext(ContextApi)
  
useEffect(()=>{
    fetch(`/api/myorders/${loginname}`)
},[])
     
    return (
        <section id="dashboard">

            <div className="container">
              <div className="row">
                <div className="col-md-12">
                    <table className="table tbale-hover">
                       <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Image</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Desc</th>
                        </tr>
                        </thead> 
                       <tbody>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                       </tbody>
                    </table>
                </div>
              </div>
            </div>



        </section>
    );
}


export default MyOrders;