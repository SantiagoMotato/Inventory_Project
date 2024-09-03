import React, { useEffect, useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import {Select, SelectItem} from "@nextui-org/react";
import axios from "axios";
import {Toaster, toast} from 'sonner'
import { FaCheckCircle } from "react-icons/fa";
import { IoIosWarning } from "react-icons/io";

function RegistrarUnidadProductiva({ isOpen, onOpen, onClose, getUnidadesProductivas }) {
  const [size, setSize] = React.useState("md");

  const sizes = ["3xl"];
  const variants = ["underlined"];

  const [nombre_unidad_productiva, setNombreUnidadProductiva] = useState("");
  const [validationMessages, setValidationMessages] = useState("");

  const limpiarFormulario = () => {
    setNombreUnidadProductiva("");
    setValidationMessages("")
  };

  const postUnidadProductiva = async() => {
    try {
      const res = await axios.post("http://localhost:4000/unidadesProductivas/registrar", {
        nombre_unidad_productiva,
      });
      const data = res.data;
      console.log("Unidad productiva registrada:", data);
      limpiarFormulario();
      getUnidadesProductivas();
    } catch (error) {
      setValidationMessages(error.response.data.msg);
      console.log(error);

      throw error; 
    }
  };

  const SubmitRegistrarUnidadProductiva = async(event) => {
    event.preventDefault();
    if (
      !nombre_unidad_productiva
    ) {
      toast.warning('Por favor, completa todos los campos requeridos!',  {
        style: {height:"90px", fontSize: '15px',},
        icon: <IoIosWarning style={{fontSize:"24px"}}/>,
        duration: 2000
      }); 
      return;
    }
    console.log({
        nombre_unidad_productiva,
    });
    try {
      await postUnidadProductiva();
      onClose();
      toast.success('Unidad productiva Registrada!',  {
          description: "La unidad productiva ha sido registrada con éxito!",
          icon: <FaCheckCircle className="text-green-500 text-xl"/>,
          style: {height:"90px", fontSize: '15px',}
        }); 
    } catch (error) {
      // Si ocurre un error en la petición, el modal no se cierra
      console.error("Error al registrar la unidad productiva:", error);
    }
  
  };

  useEffect(()=>{
  },[]);

  return (
    <>
      <Toaster position="top-center" richColors/>
      <Modal size={sizes} isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-3xl font-extrabold text-center text-default-500 border-b-3 w-[700px] mx-auto">
                Registrar Unidad Productiva
              </ModalHeader>
              <ModalBody>
                <form className="flex flex-col justify-center mx-auto pt-6 pb-5 px-8 w-[600px]" onSubmit={SubmitRegistrarUnidadProductiva}>
                  <div className="grid grid-cols-1 gap-10 gap-x-52 mx-auto">
                    <div className="w-full flex flex-col">
                      <div className="flex w-80 flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                        <Input
                          type="text"
                          variant="underlined"
                          label="Ingrese nombre de la Unidad Productiva"
                          value={nombre_unidad_productiva }
                          onChange={(e) => setNombreUnidadProductiva(e.target.value)}
                          
                        />
                      </div>
                      {
                          validationMessages && validationMessages.some(([campo]) => campo === 'nombre_unidad_productiva') && (
                            <p className="text-xs text-red-600 font-semibold">
                              {validationMessages.find(([campo]) => campo === 'nombre_unidad_productiva')[1]}
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

export default RegistrarUnidadProductiva
