
import React, { useEffect, useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import {Select, SelectItem} from "@nextui-org/react";
import axios from "axios";

function RegistrarUsuario({ isOpen, onOpen, onClose }) {
  // const { isOpen, onOpen, onClose } = useDisclosure();
  const [size, setSize] = React.useState("md");

  const sizes = ["5xl"];
  const variants = ["underlined"];

  // Estados para los valores de los campos del formulario
  const [identificacion, setIdentificacion] = useState("");
  const [nombres, setNombres] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [fk_tipo_usuario, setFk_tipo_usuario] = useState("");
  const [fk_unidad_productiva, setFkUnidadProductiva] = useState("");
  // const [estado, setEstado] = useState("");
  // const [password, setPassword] = useState("");

  const [tiposUsuario, setTiposUsuario] = useState([]);
  const [unidadesProductivas, setUnidadesProductivas] = useState([]);
  const [estado, setEstado] = useState("");
  const estadoUsuario = ['activo','inactivo'];

  const limpiarFormulario = () => {
    setIdentificacion("");
    setNombres("");
    setApellidos("");
    setEmail("");
    setTelefono("");
    setFk_tipo_usuario("");
    setFkUnidadProductiva("");
    setEstado("");
  };

  const postUsuario = async() => {
    try {
      const defaultPassword = identificacion;
      // setPassword(defaultPassword);

      const res = await axios.post("http://localhost:4000/usuarios/registrar", {
        identificacion,
        nombres,
        apellidos,
        email,
        telefono,
        fk_tipo_usuario,
        estado,
        fk_unidad_productiva,
        password: defaultPassword
      });
      const data = res.data;
      console.log("Usuario registrado:", data);
      limpiarFormulario(); //Limpia el formulario despues de registrar un Usuario
    } catch (error) {
      console.log("Error al registrar el usuario:", error);
    }
  };

  const getTiposUsuarios = async() =>{
    try {
      const res = await axios.get("http://localhost:4000/tipoUsuario/listar");
      const data = res.data;
      setTiposUsuario(data);
      console.log(data);
    } catch (error) {
      console.log("Error al traer los tipos de usuario: ",error);
    }
  };

  const getUnidadesProductivas = async() =>{
    try {
      const res = await axios.get("http://localhost:4000/unidadesProductivas/listar");
      const data = res.data;
      if (Array.isArray(data)) {
        setUnidadesProductivas(data);
        console.log(data);
      } else {
        console.log("Los datos recibidos no son un arreglo:", data);
      }
    } catch (error) {
      console.log("Error al traer las unidades productivas: ", error);
    }
  };

  // const handleOpen = (size) => {
  //   setSize(size);
  //   onOpen();
  // };

  // Maneja el evento de click del botón "Registrar"
  const SubmitRegistrarUsuario = (event) => {
    event.preventDefault();
    if (
      !identificacion ||
      !nombres ||
      !apellidos ||
      !email ||
      !telefono ||
      !fk_tipo_usuario ||
      !estado ||
      !fk_unidad_productiva
    ) {
      alert("Por favor, completa todos los campos requeridos.");
      return;
    }
    console.log({
      identificacion,
      nombres,
      apellidos,
      email,
      telefono,
      estado,
      fk_tipo_usuario,
      fk_unidad_productiva,

    });
    // Llama a postUsuario aquí si quieres registrar el usuario después de mostrar los datos
    postUsuario();
    onClose(); // Cierra el modal
  };

  useEffect(()=>{
    getTiposUsuarios();
    getUnidadesProductivas();
  },[]);

  return (
    <>
      {/* <div className="flex flex-wrap gap-3">
        {sizes.map((size) => (
          <Button key={size} onPress={() => handleOpen(size)}>
            Open {size}
          </Button>
        ))}
      </div> */}
      <Modal size={sizes} isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-3xl font-extrabold text-center text-default-500 border-b-3 w-[900px] mx-auto">
                Registrar Usuario
              </ModalHeader>
              <ModalBody>
                <form className="flex flex-col justify-center mx-auto pt-6 pb-5 px-8 w-[900px]" onSubmit={SubmitRegistrarUsuario}>
                  <div className="grid grid-cols-2 gap-10 gap-x-52 mx-auto">
                    <div className="w-full flex flex-col gap-4">
                      <div className="flex w-80 flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                        <Input
                          type="text"
                          variant="underlined"
                          label="Identificación"
                          value={identificacion}
                          onChange={(e) => setIdentificacion(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="w-full flex flex-col gap-4">
                      <div className="flex w-80 flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                        <Input
                          type="text"
                          variant="underlined"
                          label="Email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="w-full flex flex-col gap-4">
                      <div className="flex w-80 flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                        <Input
                          type="text"
                          variant="underlined"
                          label="Nombres"
                          value={nombres}
                          onChange={(e) => setNombres(e.target.value)}
                          
                        />
                      </div>
                    </div>
                    <div className="w-full flex flex-col gap-4">
                      {variants.map((variant) => (
                        <div key={variant} className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                          <Select 
                            variant={variant}
                            label="Estado de usuario"
                            value={estado} // Esto debería ser el valor seleccionado del estado
                            onChange={(e) => setEstado(e.target.value)} 
                            className="max-w-xs" 
                          >
                            {estadoUsuario.map((estado, index) => (
                              <SelectItem key={estado} value={estado}>
                                {estado}
                              </SelectItem>
                            ))}
                          </Select>
                        </div>
                      ))}  
                    </div>
                    <div className="w-full flex flex-col gap-4">
                      <div className="flex w-80 flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                        <Input
                          type="text"
                          variant="underlined"
                          label="Apellidos"
                          value={apellidos}
                          onChange={(e) => setApellidos(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="w-full flex flex-col gap-4">
                      {variants.map((variant) => (
                        <div key={variant} className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                          <Select 
                            variant={variant}
                            label="Rol de usuario"
                            value={fk_tipo_usuario}
                            onChange={(e) => setFk_tipo_usuario(e.target.value)} 
                            className="max-w-xs" 
                          >
                            {tiposUsuario.map((tipo) => (
                              <SelectItem key={tipo.id_tipo_usuario} value={tipo.id}>
                                {tipo.rol}
                              </SelectItem>
                            ))}
                          </Select>
                        </div>
                      ))}  
                    </div> 
                    <div className="w-full flex flex-col gap-4">
                      <div className="flex w-80 flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                        <Input
                          type="text"
                          variant="underlined"
                          label="Telefono"
                          value={telefono}
                          onChange={(e) => setTelefono(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="w-full flex flex-col gap-4">
                      {variants.map((variant) => (
                        <div key={variant} className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                          <Select 
                            variant={variant}
                            label="Unidad Productiva"
                            value={fk_unidad_productiva}
                            onChange={(e) => setFkUnidadProductiva(e.target.value)} 
                            className="max-w-xs" 
                          >
                            {unidadesProductivas.map((unidad) => (
                              <SelectItem key={unidad.id_unidad_productiva} value={unidad.id}>
                                {unidad.nombre_unidad_productiva}
                              </SelectItem>
                            ))}
                          </Select>
                        </div>
                      ))}  
                    </div>
                  </div>
              <ModalFooter className="relative left-[94px] top-7">
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" type="submit" /* onPress={SubmitRegistrarUsuario} */>
                  Registrar
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

export default RegistrarUsuario
