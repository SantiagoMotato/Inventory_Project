
import React, { useEffect, useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";
import axios from "axios";
import { Toaster, toast } from 'sonner';
import { FaCheckCircle } from "react-icons/fa";
import { IoIosWarning } from "react-icons/io";

function ActualizarUnidadProductiva({ isOpen, onClose, unidadProductiva, getUnidadesProductivas }) {
  const [unidadProductivaData, setUnidadProductivaData] = useState({
    fk_unidad_productiva: '',
  });

  const [size] = React.useState("md");

  const sizes = ["3xl"];
  const variants = ["underlined"];

  const [validationMessages, setValidationMessages] = useState("");

  const limpiarFormulario = () => {
    setUnidadProductivaData({
        fk_unidad_productiva: '', 
    });
    setValidationMessages("");
  };

  const putUnidadProductiva = async () => {
    try {
      const res = await axios.put(`http://localhost:4000/unidadesProductivas/actualizar/${unidadProductiva.id_unidad_productiva}`, {
        ...unidadProductivaData
      });
      const data = res.data;
      console.log("Unidad Productiva actualizada:", data);
      limpiarFormulario();
      onClose();
      toast.info('Unidad Productiva Actualizada!', {
        description: "La Unidad Productiva ha sido actualizada con éxito!",
        icon: <FaCheckCircle className="text-blue-500 text-xl"/>,
        style: { height: "90px", fontSize: '15px', }
      });
      getUnidadesProductivas();
    } catch (error) {
      setValidationMessages(error.response.data.msg);
      console.log("Error al actualizar la unidad productiva:", error.response.data);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (Object.values(unidadProductivaData).some(value => value === "")) {
      toast.warning('Por favor, completa todos los campos requeridos!', {
        style: { height: "90px", fontSize: '15px', },
        icon: <IoIosWarning style={{ fontSize: "24px" }} />,
        duration: 2000
      });
      return;
    }
    await putUnidadProductiva();
  };

  useEffect(() => {
    if (unidadProductiva) {
      setUnidadProductivaData(unidadProductiva);
    }
    getUnidadesProductivas();
  }, [unidadProductiva]);

  const handleChange = (e) => {
    setUnidadProductivaData({
      ...unidadProductivaData,
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
            <ModalHeader className="flex flex-col gap-1 text-3xl font-extrabold text-center text-default-500 border-b-3 w-[700px] mx-auto">
              Actualizar Unidad Productiva
            </ModalHeader>
            <ModalBody>
              <form className="flex flex-col justify-center mx-auto pt-6 pb-5 px-8 w-[640px]" onSubmit={handleSubmit}>
                <div className="gap-10 gap-x-52 mx-auto">
                  <div className="w-full flex flex-col">
                    <div className="flex w-80 flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                      <Input
                        type="text"
                        variant="underlined"
                        label="Unidad Productiva"
                        name="nombre_unidad_productiva"
                        value={unidadProductivaData.nombre_unidad_productiva}
                        onChange={handleChange}
                      />
                    </div>
                    {validationMessages && validationMessages.some(([campo]) => campo === 'nombre_unidad_productiva') && (
                      <p className="text-xs text-red-600 font-semibold">
                        {validationMessages.find(([campo]) => campo === 'nombre_unidad_productiva')[1]}
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

export default ActualizarUnidadProductiva;