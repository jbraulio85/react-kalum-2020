import React, { useContext, useState } from 'react';
import { AuthContext } from '../../auth/AuthContext';
import { types } from '../../types/types';
import Axios from 'axios';
import swal from 'sweetalert2';

export const SignupScreen = () => {

    const { ditpatch } = useContext(AuthContext);

    const [usuario, setUsuario] = useState({
        email: '',
        username: '',
        password: '',
        bio: '',
        nombres: '',
        apellidos: ''
    });

    function handleInputChange(e) {
        setUsuario({
            ...usuario,
            [e.target.name]: e.target.value
        });
    }

    async function handleSumit(e) {
        e.preventDefault();
        try {
            const { data } = await Axios.post('http://localhost:9004/kalum-oauth/v1/usuarios', usuario);
            swal.fire('Registro', `El Registro del usuario ${usuario.username} fue creado exitosamente`, 'success');
            ditpatch({
                type: types.login,
                payload: data
            })
        } catch (error) {
            if(error.response.status === 503){
                swal.fire('UPS!!!',`Error ${error.response.data.Mensaje}`,'error');
            }else if(error.response.status === 400){
                swal.fire('UPS!!!', `Error: ${error.response.data.Mensaje}`, 'error');
            }else{
                swal.fire('UPS!!!',`Error al crear el registro`,'error');
            }
        }
    }

    return (
        <div className="container mt-5">
            <div className="card border-primary text-center">
                <div className="card-header">
                    Nuevo registro
                </div>
            </div>
            <div className="card-body">
                <form onSubmit={handleSumit}>
                    <div className="form-group row">
                        <label className="col-form-label col-md-2">Username</label>
                        <div className="col">
                            <input type="text" value={usuario.username} onChange={handleInputChange} className="form-control" name="username" placeholder="Ingrese nombre de usuario" required autoFocus />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-form-label col-md-2">Password</label>
                        <div className="col">
                            <input type="password" value={usuario.password} onChange={handleInputChange} className="form-control" name="password" placeholder="Ingrese password" required />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-form-label col-md-2">Email</label>
                        <div className="col">
                            <input type="text" value={usuario.email} onChange={handleInputChange} className="form-control" name="email" placeholder="Ingrese dirección de correo electrónico" required />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-form-label col-md-2">Bio</label>
                        <div className="col">
                            <input type="text" value={usuario.bio} onChange={handleInputChange} className="form-control" name="bio" placeholder="Ingrese su bio" required />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-form-label col-md-2">Nombres</label>
                        <div className="col">
                            <input type="text" value={usuario.nombres} onChange={handleInputChange} className="form-control" name="nombres" placeholder="Ingrese nombres del usuario" required />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-form-label col-md-2">Apellidos</label>
                        <div className="col">
                            <input type="text" value={usuario.apellidos} onChange={handleInputChange} className="form-control" name="apellidos" placeholder="Ingrese apellidos del usuario" required />
                        </div>
                    </div>
                    <div className="form-group">
                        <button className="btn btn-lg btn-primary btn-block" type="submit">Crear Usuario</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
