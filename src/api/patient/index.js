import express from "express";
import PatientModel from "./model.js";

const patientRouter = express.Router();

patientRouter.post("/", async (req, res, next) => {
  try {
    const patient = await PatientModel.create(req.body);
    res.send(patient);
  } catch (error) {
    next(error);
  }
});
patientRouter.get("/", async (req, res, next) => {
  try {
    const patient = await PatientModel.findAll();
    res.send(patient);
  } catch (error) {
    next(error);
  }
});
patientRouter.get("/:patientId", async (req, res, next) => {
  try {
    const patient = await PatientModel.findByPk(req.params.patientId);
    if (patient) {
      res.send(patient);
    }
  } catch (error) {
    next(error);
  }
});
patientRouter.put("/:patientId", async (req, res, next) => {
  try {
    const [numberOfUpdatedRows, updatedRecords] = await PatientModel.update(
      req.body,
      {
        where: { id: req.params.patientId },
        returning: true,
      }
    );
    if (numberOfUpdatedRows === 1) {
      res.send(updatedRecords[0]);
    } else {
      next(
        createHttpError(404, `User with id ${req.params.patientId} not found!`)
      );
    }
  } catch (error) {
    next(error);
  }
});
patientRouter.delete("/:patientId", async (req, res, next) => {
  try {
    const numberOfDeletedRows = await ProductsModel.destroy({
      where: { id: req.params.patientId },
    });
    if (numberOfDeletedRows === 1) {
      res.status(204).send();
    } else {
      next(
        createHttpError(404, `User with id ${req.params.productId} not found!`)
      );
    }
  } catch (error) {
    next(error);
  }
});

export default patientRouter;
