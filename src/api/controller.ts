import csvParser from "csv-parser";
import { promisify } from "util";
import { pipeline, Readable } from "stream";

import File from "../models/file.model";

const keyMap = {
  "Account Mask": "mask",
  Amount: "amount",
  Balance: "balance",
  "Reference Number": "reference_number",
  Description: "description",
  Details: "details",
  currency: "currency",
  type: "type",
};

export const saveFile = async (req, res) => {
  try {
    const { buffer } = req.file || {};
    if (!buffer) res.status(400).json({ error: "No file uploaded" });

    const pipelineAsync = promisify(pipeline);

    const transactions = await pipelineAsync(
      Readable.from(buffer),
      csvParser(),
      async (stream: Readable) => {
        const transactions = [];

        stream.on("data", (data) => {
          const mappedData = Object.keys(data).reduce((acc, key) => {
            const newKey = keyMap[key];

            if (newKey) acc[newKey] = data[key];

            return acc;
          }, {});

          transactions.push(mappedData);
        });

        await new Promise((resolve, reject) =>
          stream.on("end", resolve).on("error", reject)
        );

        return transactions;
      }
    );

    await File.bulkCreate(transactions, {
      validate: true,
      updateOnDuplicate: Object.values(keyMap),
    });

    console.log(transactions);

    res.status(200).json({ message: "CSV data saved to DB", transactions });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error Saving Transactions" });
  }
};

export const getTransactions = async (_, res) => {
  try {
    const transactions = await File.findAll();

    res.status(200).json({ transactions });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error Fetching Transactions" });
  }
};
