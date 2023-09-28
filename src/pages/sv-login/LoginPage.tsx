export const LoginPage = () => {

  return (
    <div>        
        <div>
            <form>
                <div className="form-outline mb-4">
                    <label htmlFor="user" className="form-label">Usuario</label>
                    <input 
                        type="text"
                        id="user" 
                        className="form-control"
                    />
                </div>
                <div className="form-outline mb-4">
                    <label htmlFor="password" className="form-label" >Password</label>
                    <input 
                        type="password" 
                        id="form2Example2" 
                        className="form-control" 
                    />
                </div>
                <div className="row mb-4">
                    <button type="button" className="btn btn-primary btn-block mb-4">Ingresar</button>
                </div>
            </form>
        </div>
    </div>
  )
}
