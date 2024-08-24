// import React, { useEffect, useState } from "react";
// import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
// import { Input } from "@nextui-org/react";
// import {Select, SelectItem} from "@nextui-org/react";
// import axios from "axios";
// import {Toaster, toast} from 'sonner'
// import { FaCheckCircle } from "react-icons/fa";
// import { IoIosWarning } from "react-icons/io";

// function ActualizarUsuario({ isOpen, onOpen, onClose, user }) {
//   // const { isOpen, onOpen, onClose } = useDisclosure();

//   const [userData, setUserData] = useState({
//     identificacion: '',
//     nombres: '',
//     apellidos: '',
//     email: '',
//     telefono: '',
//     fk_tipo_usuario: '',
//     fk_unidad_productiva: '',
//     estado: ''
//   });

//   const [size, setSize] = React.useState("md");

//   const sizes = ["5xl"];
//   const variants = ["underlined"];

//   // Estados para los valores de los campos del formulario
//   const [identificacion, setIdentificacion] = useState("");
//   const [nombres, setNombres] = useState("");
//   const [apellidos, setApellidos] = useState("");
//   const [email, setEmail] = useState("");
//   const [telefono, setTelefono] = useState("");
//   const [estado, setEstado] = useState("");
//   const [fk_tipo_usuario, setFk_tipo_usuario] = useState("");
//   const [fk_unidad_productiva, setFkUnidadProductiva] = useState("");
//   // const [estado, setEstado] = useState("");
//   // const [password, setPassword] = useState("");

//   const [tiposUsuario, setTiposUsuario] = useState([]);
//   const [unidadesProductivas, setUnidadesProductivas] = useState([]);
//   const [validationMessages, setValidationMessages] = useState("");
//   const estadoUsuario = ['activo','inactivo'];

//   const limpiarFormulario = () => {
//     setIdentificacion("");
//     setNombres("");
//     setApellidos("");
//     setEmail("");
//     setTelefono("");
//     setFk_tipo_usuario("");
//     setFkUnidadProductiva("");
//     setEstado("");
//     setValidationMessages("");
//   };

//   const putUsuario = async() => {
//     try {
//       const defaultPassword = identificacion;
//       // setPassword(defaultPassword);

//       const res = await axios.post("http://localhost:4000/usuarios/registrar", {
//         identificacion,
//         nombres,
//         apellidos,
//         email,
//         telefono,
//         fk_tipo_usuario,
//         estado,
//         fk_unidad_productiva,
//         password: defaultPassword
//       });
//       const data = res.data;
//       console.log("Usuario registrado:", data);
//       limpiarFormulario();
//       getUsuarios();
//     } catch (error) {
//       // console.log("Error al registrar el usuario:", error);
//       setValidationMessages(error.response.data.msg);
//       console.log(error.response.data);
//       throw error;
//     }
//   };

//   const getTiposUsuarios = async() =>{
//     try {
//       const res = await axios.get("http://localhost:4000/tipoUsuario/listar");
//       const data = res.data;
//       setTiposUsuario(data);
//       console.log(data);
//     } catch (error) {
//       console.log("Error al traer los tipos de usuario: ",error);
//     }
//   };

//   const getUnidadesProductivas = async() =>{
//     try {
//       const res = await axios.get("http://localhost:4000/unidadesProductivas/listar");
//       const data = res.data;
//       if (Array.isArray(data)) {
//         setUnidadesProductivas(data);
//         console.log(data);
//       } else {
//         console.log("Los datos recibidos no son un arreglo:", data);
//       }
//     } catch (error) {
//       console.log("Error al traer las unidades productivas: ", error);
//     }
//   };

//   // const handleOpen = (size) => {
//   //   setSize(size);
//   //   onOpen();
//   // };

//   // Maneja el evento de click del botón "Registrar"
//   const SubmitRegistrarUsuario = async(event) => {
//     event.preventDefault();
//     if (
//       !identificacion ||
//       !nombres ||
//       !apellidos ||
//       !email ||
//       !telefono ||
//       !fk_tipo_usuario ||
//       !estado ||
//       !fk_unidad_productiva
//     ) {
//       toast.warning('Por favor, completa todos los campos requeridos!',  {
//         style: {height:"90px", fontSize: '15px',},
//         icon: <IoIosWarning style={{fontSize:"24px"}}/>,
//         duration: 2000
//       }); 
//       return;
//     }
//     console.log({
//       identificacion,
//       nombres,
//       apellidos,
//       email,
//       telefono,
//       estado,
//       fk_tipo_usuario,
//       fk_unidad_productiva,

//     });
//     try {
//       await putUsuario(); 
//       onClose(); 
//       toast.info('Usuario Actualizado!',  {
//           description: "El usuario ha sido actualizado con éxito!",
//           icon: <FaCheckCircle className="text-blue-500 text-xl"/>,
//           style: {height:"90px", fontSize: '15px',}
//         }); 
//     } catch (error) {
//       console.error("Error al actualizar el usuario:", error);
//     }
  
//   };

//   useEffect(() => {
//     if (user) {
//       setUserData(user); // Cargar los datos del usuario en el estado
//     }
//     getUnidadesProductivas();
//     getTiposUsuarios();
//   }, [user]);

//   const handleChange = (e) => {
//     setUserData({
//       ...userData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   return (
//     <>
//       {/* <div className="flex flex-wrap gap-3">
//         {sizes.map((size) => (
//           <Button key={size} onPress={() => handleOpen(size)}>
//             Open {size}
//           </Button>
//         ))}
//       </div> */}
//       <Toaster position="top-center" richColors/>
//       <Modal size={sizes} isOpen={isOpen} onClose={onClose}>
//         <ModalContent>
//           {(onClose) => (
//             <>
//               <ModalHeader className="flex flex-col gap-1 text-3xl font-extrabold text-center text-default-500 border-b-3 w-[900px] mx-auto">
//                 Actualizar Usuario
//               </ModalHeader>
//               <ModalBody>
//                 <form className="flex flex-col justify-center mx-auto pt-6 pb-5 px-8 w-[900px]" onSubmit={SubmitRegistrarUsuario}>
//                   <div className="grid grid-cols-2 gap-10 gap-x-52 mx-auto">
//                     <div className="w-full flex flex-col">
//                       <div className="flex w-80 flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
//                         <Input
//                           type="number"
//                           variant="underlined"
//                           label="Identificación"
//                           // value={identificacion}
//                           value={userData.identificacion}
//                           onChange={(e) => setIdentificacion(e.target.value)}
//                         />
//                       </div>
//                         {
//                           validationMessages && validationMessages.some(([campo]) => campo === 'identificacion') && (
//                             <p className="text-xs text-red-600 font-semibold">
//                               {validationMessages.find(([campo]) => campo === 'identificacion')[1]}
//                             </p>
//                           )
//                         }
//                     </div>
//                     <div className="w-full flex flex-col">
//                       <div className="flex w-80 flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
//                         <Input
//                           type="email"
//                           variant="underlined"
//                           label="Email"
//                           value={userData.email}
//                           onChange={(e) => setEmail(e.target.value)}
//                         />
//                       </div>
//                       {
//                           validationMessages && validationMessages.some(([campo]) => campo === 'email') && (
//                             <p className="text-xs text-red-600 font-semibold">
//                               {validationMessages.find(([campo]) => campo === 'email')[1]}
//                             </p>
//                           )
//                         }
//                     </div>
//                     <div className="w-full flex flex-col">
//                       <div className="flex w-80 flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
//                         <Input
//                           type="text"
//                           variant="underlined"
//                           label="Nombres"
//                           value={userData.nombres}
//                           onChange={(e) => setNombres(e.target.value)}
                          
//                         />
//                       </div>
//                       {
//                           validationMessages && validationMessages.some(([campo]) => campo === 'nombres') && (
//                             <p className="text-xs text-red-600 font-semibold">
//                               {validationMessages.find(([campo]) => campo === 'nombres')[1]}
//                             </p>
//                           )
//                         }
//                     </div>
//                     <div className="w-full flex flex-col">
//                       {variants.map((variant) => (
//                         <div key={variant} className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
//                           <Select 
//                             variant={variant}
//                             label={ <span>
//                               {"Estado de usuario - "}
//                               <span style={{ fontSize: '16px', fontWeight: 'bold' }}>
//                                 {userData.estado}
//                               </span>
//                             </span>}
//                             value={userData.estado} // Esto debería ser el valor seleccionado del estado
//                             onChange={(e) => setEstado(e.target.value)} 
//                             onClick={()=> alert(userData.estado)}
//                             className="max-w-xs" 
//                           >
//                             {estadoUsuario.map((estado, index) => (
//                               <SelectItem key={estado} value={estado}>
//                                 {estado}
//                               </SelectItem>
//                             ))}
//                           </Select>
//                         </div>
//                       ))}  
//                       {
//                           validationMessages && validationMessages.some(([campo]) => campo === 'estado') && (
//                             <p className="text-xs text-red-600 font-semibold">
//                               {validationMessages.find(([campo]) => campo === 'estado')[1]}
//                             </p>
//                           )
//                         }
//                     </div>
//                     <div className="w-full flex flex-col">
//                       <div className="flex w-80 flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
//                         <Input
//                           type="text"
//                           variant="underlined"
//                           label="Apellidos"
//                           value={userData.apellidos}
//                           onChange={(e) => setApellidos(e.target.value)}
//                         />
//                       </div>
//                       {
//                           validationMessages && validationMessages.some(([campo]) => campo === 'apellidos') && (
//                             <p className="text-xs text-red-600 font-semibold">
//                               {validationMessages.find(([campo]) => campo === 'apellidos')[1]}
//                             </p>
//                           )
//                         }
//                     </div>
//                     <div className="w-full flex flex-col">
//                       {variants.map((variant) => (
//                         <div key={variant} className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
//                           <Select 
//                             variant={variant}
//                             label={ <span>
//                               {"Rol de usuario - "}
//                               <span style={{ fontSize: '16px', fontWeight: 'bold' }}>
//                                 {userData.rol}
//                               </span>
//                             </span>}
//                             value={userData.fk_tipo_usuario}
//                             onClick={()=> alert(userData.rol)}
//                             onChange={(e) => setFk_tipo_usuario(e.target.value)} 
//                             className="max-w-xs" 
//                           >
//                             {tiposUsuario.map((tipo) => (
//                               <SelectItem key={tipo.id_tipo_usuario} value={tipo.id_tipo_usuario}>
//                                 {tipo.rol}
//                               </SelectItem>
//                             ))}
//                           </Select>
//                         </div>
//                       ))}  
//                       {
//                           validationMessages && validationMessages.some(([campo]) => campo === 'fk_tipo_usuario') && (
//                             <p className="text-xs text-red-600 font-semibold">
//                               {validationMessages.find(([campo]) => campo === 'fk_tipo_usuario')[1]}
//                             </p>
//                           )
//                         }
//                     </div> 
//                     <div className="w-full flex flex-col">
//                       <div className="flex w-80 flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
//                         <Input
//                           type="number"
//                           variant="underlined"
//                           label="Telefono"
//                           value={userData.telefono}
//                           onChange={(e) => setTelefono(e.target.value)}
//                         />
//                       </div>
//                       {
//                           validationMessages && validationMessages.some(([campo]) => campo === 'telefono') && (
//                             <p className="text-xs text-red-600 font-semibold">
//                               {validationMessages.find(([campo]) => campo === 'telefono')[1]}
//                             </p>
//                           )
//                         }
//                     </div>
//                     <div className="w-full flex flex-col">
//                       {variants.map((variant) => (
//                         <div key={variant} className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
//                           <Select 
//                             variant={variant}
//                             label={ <span>
//                               {"Unidad Productiva - "}
//                               <span style={{ fontSize: '16px', fontWeight: 'bold' }}>
//                                 {userData.nombre_unidad_productiva}
//                               </span>
//                             </span>}
//                             value={userData.fk_unidad_productiva}
//                             onClick={()=> alert(userData.nombre_unidad_productiva)}
//                             onChange={(e) => setFkUnidadProductiva(e.target.value)} 
//                             className="max-w-xs" 
//                           >
//                             {unidadesProductivas.map((unidad) => (
//                               <SelectItem key={unidad.id_unidad_productiva} value={unidad.id}>
//                                 {unidad.nombre_unidad_productiva}
//                               </SelectItem>
//                             ))}
//                           </Select>
//                         </div>
//                       ))}  
//                       {
//                           validationMessages && validationMessages.some(([campo]) => campo === 'fk_unidad_productiva') && (
//                             <p className="text-xs text-red-600 font-semibold">
//                               {validationMessages.find(([campo]) => campo === 'fk_unidad_productiva')[1]}
//                             </p>
//                           )
//                         }
//                     </div>
//                   </div>
//               <ModalFooter className="relative left-[94px] top-7">
//                 <Button color="danger" variant="light" onPress={onClose}>
//                   Close
//                 </Button>
//                 <Button color="primary" type="submit" /* onPress={SubmitRegistrarUsuario} */>
//                   Actualizar
//                 </Button>
//               </ModalFooter>
//                 </form>
//               </ModalBody>
//             </>
//           )}
//         </ModalContent>
//       </Modal>
//     </>
//   );
// }

// export default ActualizarUsuario


import React, { useEffect, useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";
import axios from "axios";
import { Toaster, toast } from 'sonner';
import { FaCheckCircle } from "react-icons/fa";
import { IoIosWarning } from "react-icons/io";

function ActualizarUsuario({ isOpen, onClose, user, getUsuarios }) {
  const [userData, setUserData] = useState({
    identificacion: '',
    nombres: '',
    apellidos: '',
    email: '',
    telefono: '',
    fk_tipo_usuario: '',
    fk_unidad_productiva: '',
    estado: ''
  });

  const [size] = React.useState("md");

  const sizes = ["5xl"];
  const variants = ["underlined"];

  const [tiposUsuario, setTiposUsuario] = useState([]);
  const [unidadesProductivas, setUnidadesProductivas] = useState([]);
  const [validationMessages, setValidationMessages] = useState("");
  const estadoUsuario = ['activo', 'inactivo'];

  const limpiarFormulario = () => {
    setUserData({
      identificacion: '',
      nombres: '',
      apellidos: '',
      email: '',
      telefono: '',
      fk_tipo_usuario: '',
      fk_unidad_productiva: '',
      estado: ''
    });
    setValidationMessages("");
  };

  const putUsuario = async () => {
    try {
      const defaultPassword = userData.identificacion;

      const res = await axios.put(`http://localhost:4000/usuarios/actualizar/${userData.id_usuario}`, {
        ...userData,
        password: defaultPassword
      });
      const data = res.data;
      console.log("Usuario actualizado:", data);
      limpiarFormulario();
      onClose();
      toast.info('Usuario Actualizado!', {
        description: "El usuario ha sido actualizado con éxito!",
        icon: <FaCheckCircle className="text-blue-500 text-xl"/>,
        style: { height: "90px", fontSize: '15px', }
      });
      getUsuarios();
    } catch (error) {
      setValidationMessages(error.response.data.msg);
      console.log("Error al actualizar el usuario:", error.response.data);
    }
  };

  const getTiposUsuarios = async () => {
    try {
      const res = await axios.get("http://localhost:4000/tipoUsuario/listar");
      setTiposUsuario(res.data);
    } catch (error) {
      console.log("Error al traer los tipos de usuario: ", error);
    }
  };

  const getUnidadesProductivas = async () => {
    try {
      const res = await axios.get("http://localhost:4000/unidadesProductivas/listar");
      setUnidadesProductivas(res.data);
    } catch (error) {
      console.log("Error al traer las unidades productivas: ", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (Object.values(userData).some(value => value === "")) {
      toast.warning('Por favor, completa todos los campos requeridos!', {
        style: { height: "90px", fontSize: '15px', },
        icon: <IoIosWarning style={{ fontSize: "24px" }} />,
        duration: 2000
      });
      return;
    }
    await putUsuario();
  };

  useEffect(() => {
    if (user) {
      setUserData(user);
    }
    getUnidadesProductivas();
    getTiposUsuarios();
  }, [user]);

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <Toaster position="top-center" richColors />
      <Modal size={sizes} isOpen={isOpen} onClose={onClose}>
        <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 text-3xl font-extrabold text-center text-default-500 border-b-3 w-[900px] mx-auto">
              Actualizar Usuario
            </ModalHeader>
            <ModalBody>
              <form className="flex flex-col justify-center mx-auto pt-6 pb-5 px-8 w-[900px]" onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-10 gap-x-52 mx-auto">
                  <div className="w-full flex flex-col">
                    <div className="flex w-80 flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                      <Input
                        type="number"
                        variant="underlined"
                        label="Identificación"
                        name="identificacion"
                        value={userData.identificacion}
                        onChange={handleChange}
                      />
                    </div>
                    {validationMessages && validationMessages.some(([campo]) => campo === 'identificacion') && (
                      <p className="text-xs text-red-600 font-semibold">
                        {validationMessages.find(([campo]) => campo === 'identificacion')[1]}
                      </p>
                    )}
                  </div>
                  <div className="w-full flex flex-col">
                    <div className="flex w-80 flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                      <Input
                        type="email"
                        variant="underlined"
                        label="Email"
                        name="email"
                        value={userData.email}
                        onChange={handleChange}
                      />
                    </div>
                    {validationMessages && validationMessages.some(([campo]) => campo === 'email') && (
                      <p className="text-xs text-red-600 font-semibold">
                        {validationMessages.find(([campo]) => campo === 'email')[1]}
                      </p>
                    )}
                  </div>
                  <div className="w-full flex flex-col">
                    <div className="flex w-80 flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                      <Input
                        type="text"
                        variant="underlined"
                        label="Nombres"
                        name="nombres"
                        value={userData.nombres}
                        onChange={handleChange}
                      />
                    </div>
                    {validationMessages && validationMessages.some(([campo]) => campo === 'nombres') && (
                      <p className="text-xs text-red-600 font-semibold">
                        {validationMessages.find(([campo]) => campo === 'nombres')[1]}
                      </p>
                    )}
                  </div>
                  <div className="w-full flex flex-col">
                    {variants.map((variant) => (
                      <div key={variant} className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                        <Select
                          variant={variant}
                          label={
                            <span>
                              {"Estado de usuario - "}
                              <span style={{ fontSize: '16px', fontWeight: 'bold' }}>
                                {userData.estado}
                              </span>
                            </span>}
                          name="estado"
                          value={userData.estado}
                          onChange={(e) => setUserData({ ...userData, estado: e.target.value })}
                          className="max-w-xs"
                        >
                          {estadoUsuario.map((estado) => (
                            <SelectItem key={estado} value={estado}>
                              {estado}
                            </SelectItem>
                          ))}
                        </Select>
                      </div>
                    ))}
                    {validationMessages && validationMessages.some(([campo]) => campo === 'estado') && (
                      <p className="text-xs text-red-600 font-semibold">
                        {validationMessages.find(([campo]) => campo === 'estado')[1]}
                      </p>
                    )}
                  </div>
                  <div className="w-full flex flex-col">
                    <div className="flex w-80 flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                      <Input
                        type="text"
                        variant="underlined"
                        label="Apellidos"
                        name="apellidos"
                        value={userData.apellidos}
                        onChange={handleChange}
                      />
                    </div>
                    {validationMessages && validationMessages.some(([campo]) => campo === 'apellidos') && (
                      <p className="text-xs text-red-600 font-semibold">
                        {validationMessages.find(([campo]) => campo === 'apellidos')[1]}
                      </p>
                    )}
                  </div>
                  <div className="w-full flex flex-col">
                    {variants.map((variant) => (
                      <div key={variant} className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                        <Select
                          variant={variant}
                          label={
                            <span>
                              {"Rol de usuario - "}
                              <span style={{ fontSize: '16px', fontWeight: 'bold' }}>
                                {userData.rol}
                              </span>
                            </span>}
                          name="fk_tipo_usuario"
                          value={userData.fk_tipo_usuario}
                          onChange={(e) => setUserData({ ...userData, fk_tipo_usuario: e.target.value })}
                          className="max-w-xs"
                        >
                          {tiposUsuario.map((tipo) => (
                            <SelectItem key={tipo.id_tipo_usuario} value={tipo.id_tipo_usuario}>
                              {tipo.rol}
                            </SelectItem>
                          ))}
                        </Select>
                      </div>
                    ))}
                    {validationMessages && validationMessages.some(([campo]) => campo === 'fk_tipo_usuario') && (
                      <p className="text-xs text-red-600 font-semibold">
                        {validationMessages.find(([campo]) => campo === 'fk_tipo_usuario')[1]}
                      </p>
                    )}
                  </div>
                  <div className="w-full flex flex-col">
                    <div className="flex w-80 flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                      <Input
                        type="tel"
                        variant="underlined"
                        label="Teléfono"
                        name="telefono"
                        value={userData.telefono}
                        onChange={handleChange}
                      />
                    </div>
                    {validationMessages && validationMessages.some(([campo]) => campo === 'telefono') && (
                      <p className="text-xs text-red-600 font-semibold">
                        {validationMessages.find(([campo]) => campo === 'telefono')[1]}
                      </p>
                    )}
                  </div>
                  <div className="w-full flex flex-col">
                    {variants.map((variant) => (
                      <div key={variant} className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                        <Select
                          variant={variant}
                          label={
                            <span>
                              {"Unidad productiva - "}
                              <span style={{ fontSize: '16px', fontWeight: 'bold' }}>
                                {userData.nombre_unidad_productiva}
                              </span>
                            </span>}
                          name="fk_unidad_productiva"
                          value={userData.fk_unidad_productiva}
                          onChange={(e) => setUserData({ ...userData, fk_unidad_productiva: e.target.value })}
                          className="max-w-xs"
                        >
                          {unidadesProductivas.map((unidad) => (
                            <SelectItem key={unidad.id_unidad_productiva} value={unidad.id_unidad_productiva}>
                              {unidad.nombre_unidad_productiva}
                            </SelectItem>
                          ))}
                        </Select>
                      </div>
                    ))}
                    {validationMessages && validationMessages.some(([campo]) => campo === 'fk_unidad_productiva') && (
                      <p className="text-xs text-red-600 font-semibold">
                        {validationMessages.find(([campo]) => campo === 'fk_unidad_productiva')[1]}
                      </p>
                    )}
                  </div>
                </div>
              <ModalFooter className="relative left-[94px] top-7">
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" type="submit" /* onPress={SubmitRegistrarUsuario} */>
                  Actualizar
                </Button>
              </ModalFooter>
              </form>
            </ModalBody>
          </>
            )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default ActualizarUsuario;
