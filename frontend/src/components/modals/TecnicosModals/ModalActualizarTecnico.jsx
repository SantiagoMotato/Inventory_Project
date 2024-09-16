
import React, { useEffect, useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";
import axios from "axios";
import { Toaster, toast } from 'sonner';
import { FaCheckCircle } from "react-icons/fa";
import { IoIosWarning } from "react-icons/io";

function ActualizarTecnico({ isOpen, onClose, tecnico, getTecnicos }) {

  const [size] = React.useState("md");
  const sizes = ["5xl"];
  const variants = ["underlined"];

  const [validationMessages, setValidationMessages] = useState("");

  const [tecnicoData, setTecnicoData] = useState({
    identificacion:'',
    nombres:'',
    apellidos:'',
    correo:'',
    telefono:''
  });
 
  const limpiarFormulario = () => {
    setTecnicoData({
      identificacion:'',
      nombres:'',
      apellidos:'',
      correo:'',
      telefono:''
    });
    setValidationMessages("");
  };

  const putTecnico = async () => {
    try {
      const res = await axios.put(`http://localhost:4000/tecnicos/actualizar/${tecnicoData.id_tecnico}`, {
        ...tecnicoData
      });
      const data = res.data;
      console.log("Técnico actualizado:", data);
      limpiarFormulario();
      onClose();
      toast.info('Técnico Actualizado!', {
        description: "El ténico ha sido actualizado con éxito!",
        icon: <FaCheckCircle className="text-blue-500 text-xl"/>,
        style: { height: "90px", fontSize: '15px', }
      });
      getTecnicos();
    } catch (error) {
      setValidationMessages(error.response.data.msg);
      console.log("Error al actualizar el técnico:", error.response.data);
      // throw error;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (Object.values(tecnicoData).some(value => value === "")) {
      toast.warning('Por favor, completa todos los campos requeridos!', {
        style: { height: "90px", fontSize: '15px', },
        icon: <IoIosWarning style={{ fontSize: "24px" }} />,
        duration: 2000
      });
      return;
    }
    await putTecnico();
  };

  useEffect(() => {
    if (tecnico) {
      setTecnicoData(tecnico);
    }
  }, [tecnico]);

  const handleChange = (e) => {
    setTecnicoData({
      ...tecnicoData,
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
              Actualizar Técnico
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
                        value={tecnicoData.identificacion}
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
                        type="text"
                        variant="underlined"
                        label="Nombres"
                        name="nombres"
                        value={tecnicoData.nombres}
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
                    <div className="flex w-80 flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                      <Input
                        type="text"
                        variant="underlined"
                        label="Apellidos"
                        name="apellidos"
                        value={tecnicoData.apellidos}
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
                    <div className="flex w-80 flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                      <Input
                        type="email"
                        variant="underlined"
                        label="Correo"
                        name="correo"
                        value={tecnicoData.correo}
                        onChange={handleChange}
                      />
                    </div>
                    {validationMessages && validationMessages.some(([campo]) => campo === 'correo') && (
                      <p className="text-xs text-red-600 font-semibold">
                        {validationMessages.find(([campo]) => campo === 'correo')[1]}
                      </p>
                    )}
                  </div>
                  <div className="w-full flex flex-col">
                    <div className="flex w-80 flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                      <Input
                        type="number"
                        variant="underlined"
                        label="Teléfono"
                        name="telefono"
                        value={tecnicoData.telefono}
                        onChange={handleChange}
                      />
                    </div>
                    {validationMessages && validationMessages.some(([campo]) => campo === 'telefono') && (
                      <p className="text-xs text-red-600 font-semibold">
                        {validationMessages.find(([campo]) => campo === 'telefono')[1]}
                      </p>
                    )}
                  </div>
                </div>
              <ModalFooter className="relative left-[94px] top-7">
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" type="submit">
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

export default ActualizarTecnico;