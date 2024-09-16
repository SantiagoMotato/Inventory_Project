import React, { useEffect, useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import {Select, SelectItem} from "@nextui-org/react";
import axios from "axios";
import {Toaster, toast} from 'sonner'
import { FaCheckCircle } from "react-icons/fa";
import { IoIosWarning } from "react-icons/io";

function RegistrarUbicacion({ isOpen, onOpen, onClose, getUbicaciones }) {

  const [size, setSize] = React.useState("md");
  const sizes = ["3xl"];
  const variants = ["underlined"];

  const [ambiente, setAmbientes] = useState([]);
  const [sitio, setSitios] = useState([]);
  const [unidadesProductivas, setUnidadesProductivas] = useState([]);
  const [fk_unidad_productiva, setFkUnidadProductiva] = useState("");
  const [validationMessages, setValidationMessages] = useState("");

  const limpiarFormulario = () => {
    setAmbientes("");
    setSitios("");
    setFkUnidadProductiva("");
  };

  const postUbicacion = async() => {
    try {
      const res = await axios.post("http://localhost:4000/ubicaciones/registrar", {
        ambiente,
        sitio,
        fk_unidad_productiva,
      });
      const data = res.data;
      console.log("Ubicacion registrada:", data);
      limpiarFormulario();
      getUbicaciones();
    } catch (error) {
      setValidationMessages(error.response.data.msg);
      console.log(error.response.data);

      throw error; 
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

  // Maneja el evento de click del botón "Registrar"
  const SubmitRegistrarUbicacion = async(event) => {
    event.preventDefault();
    if (
      !ambiente ||
      !sitio ||
      !fk_unidad_productiva
    ) {
      toast.warning('Por favor, completa todos los campos requeridos!',  {
        style: {height:"90px", fontSize: '15px',},
        icon: <IoIosWarning style={{fontSize:"24px"}}/>,
        duration: 2000
      }); 
      return;
    }
    console.log({
      ambiente,
      sitio,
      fk_unidad_productiva,

    });
    try {
      await postUbicacion();
      onClose();
      toast.success('Ubiación Registrada!',  {
          description: "La ubicación ha sido registrada con éxito!",
          icon: <FaCheckCircle className="text-green-500 text-xl"/>,
          style: {height:"90px", fontSize: '15px',}
        }); 
    } catch (error) {
      // Si ocurre un error en la petición, el modal no se cierra
      console.error("Error al registrar la ubiación:", error);
    }
  
  };

  useEffect(()=>{
    getUnidadesProductivas();
  },[]);

  return (
    <>
      <Toaster position="top-center" richColors/>
      <Modal size={sizes} isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-3xl font-extrabold text-center text-default-500 border-b-3 w-[700px] mx-auto">
                Registrar Ubicación
              </ModalHeader>
              <ModalBody>
                <form className="flex flex-col justify-center mx-auto pt-6 pb-5 px-8 w-[600px]" onSubmit={SubmitRegistrarUbicacion}>
                  <div className="grid grid-cols-1 gap-10 gap-x-52 mx-auto">
                    <div className="w-full flex flex-col">
                      <div className="flex w-80 flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                        <Input
                          type="text"
                          variant="underlined"
                          label="Ambiente"
                          name="ambiente"
                          value={ambiente}
                          onChange={(e) => setAmbientes(e.target.value)}
                        />
                      </div>
                        {
                          validationMessages && validationMessages.some(([campo]) => campo === 'ambiente') && (
                            <p className="text-xs text-red-600 font-semibold">
                              {validationMessages.find(([campo]) => campo === 'ambiente')[1]}
                            </p>
                          )
                        }
                    </div>
                    <div className="w-full flex flex-col">
                      <div className="flex w-80 flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                        <Input
                          type="text"
                          variant="underlined"
                          label="Sitio"
                          value={sitio}
                          onChange={(e) => setSitios(e.target.value)}
                          
                        />
                      </div>
                      {
                          validationMessages && validationMessages.some(([campo]) => campo === 'nombres') && (
                            <p className="text-xs text-red-600 font-semibold">
                              {validationMessages.find(([campo]) => campo === 'nombres')[1]}
                            </p>
                          )
                        }
                    </div>
                    <div className="w-full flex flex-col">
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
                              <SelectItem key={unidad.id_unidad_productiva} value={unidad.id_unidad_productiva}>
                                {unidad.nombre_unidad_productiva}
                              </SelectItem>
                            ))}
                          </Select>
                        </div>
                      ))}  
                      {
                          validationMessages && validationMessages.some(([campo]) => campo === 'fk_unidad_productiva') && (
                            <p className="text-xs text-red-600 font-semibold">
                              {validationMessages.find(([campo]) => campo === 'fk_unidad_productiva')[1]}
                            </p>
                          )
                        }
                    </div>
                  </div>
                  <ModalFooter className="relative left-[110px] top-7">
                    <Button color="danger" variant="light" onPress={onClose}>
                    Close
                    </Button>
                    <Button color="primary" type="submit">
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

export default RegistrarUbicacion
