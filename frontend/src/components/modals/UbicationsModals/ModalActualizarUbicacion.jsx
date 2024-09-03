
import React, { useEffect, useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";
import axios from "axios";
import { Toaster, toast } from 'sonner';
import { FaCheckCircle } from "react-icons/fa";
import { IoIosWarning } from "react-icons/io";

function ActualizarUbicacion({ isOpen, onClose, ubicacion, getUbicaciones }) {
  const [ubicationData, setUbicationData] = useState({
    ambiente: '',
    sitio: '',
    fk_unidad_productiva: '',
  });

  const [size] = React.useState("md");

  const sizes = ["5xl"];
  const variants = ["underlined"];

  const [unidadesProductivas, setUnidadesProductivas] = useState([]);
  const [validationMessages, setValidationMessages] = useState("");

  const limpiarFormulario = () => {
    setUbicationData({
        ambiente: '',
        sitio: '',
        fk_unidad_productiva: '',
    });
    setValidationMessages("");
  };

  const putUbicacion = async () => {
    try {
      const res = await axios.put(`http://localhost:4000/ubicaciones/actualizar/${ubicationData.id_ubicacion}`, {
        ...ubicationData
      });
      const data = res.data;
      console.log("Ubicación actualizada:", data);
      limpiarFormulario();
      onClose();
      toast.info('Ubicación Actualizada!', {
        description: "La ubiación ha sido actualizada con éxito!",
        icon: <FaCheckCircle className="text-blue-500 text-xl"/>,
        style: { height: "90px", fontSize: '15px', }
      });
      getUbicaciones();
    } catch (error) {
      setValidationMessages(error.response.data.msg);
      console.log("Error al actualizar la ubicación:", error.response.data);
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
    if (Object.values(ubicationData).some(value => value === "")) {
      toast.warning('Por favor, completa todos los campos requeridos!', {
        style: { height: "90px", fontSize: '15px', },
        icon: <IoIosWarning style={{ fontSize: "24px" }} />,
        duration: 2000
      });
      return;
    }
    await putUbicacion();
  };

  useEffect(() => {
    if (ubicacion) {
      setUbicationData(ubicacion);
    }
    getUnidadesProductivas();
  }, [ubicacion]);

  const handleChange = (e) => {
    setUbicationData({
      ...ubicationData,
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
              Actualizar Ubicación
            </ModalHeader>
            <ModalBody>
              <form className="flex flex-col justify-center mx-auto pt-6 pb-5 px-8 w-[900px]" onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-10 gap-x-52 mx-auto">
                  <div className="w-full flex flex-col">
                    <div className="flex w-80 flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                      <Input
                        type="text"
                        variant="underlined"
                        label="Ambiente"
                        name="ambiente"
                        value={ubicationData.ambiente}
                        onChange={handleChange}
                      />
                    </div>
                    {validationMessages && validationMessages.some(([campo]) => campo === 'ambiente') && (
                      <p className="text-xs text-red-600 font-semibold">
                        {validationMessages.find(([campo]) => campo === 'ambiente')[1]}
                      </p>
                    )}
                  </div>
                  <div className="w-full flex flex-col">
                    <div className="flex w-80 flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                      <Input
                        type="text"
                        variant="underlined"
                        label="Sitio"
                        name="sitio"
                        value={ubicationData.sitio}
                        onChange={handleChange}
                      />
                    </div>
                    {validationMessages && validationMessages.some(([campo]) => campo === 'sitio') && (
                      <p className="text-xs text-red-600 font-semibold">
                        {validationMessages.find(([campo]) => campo === 'sitio')[1]}
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
                                {ubicationData.nombre_unidad_productiva}
                              </span>
                            </span>}
                          name="fk_unidad_productiva"
                          value={ubicationData.fk_unidad_productiva}
                          onChange={(e) => setUbicationData({ ...ubicationData, fk_unidad_productiva: e.target.value })}
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

export default ActualizarUbicacion;