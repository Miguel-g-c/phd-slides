import fs from "fs";
import path from "path";

function clearDirectory(directory) {
  if (fs.existsSync(directory)) {
    const files = fs.readdirSync(directory);
    for (const file of files) {
      const filePath = path.join(directory, file);
      fs.unlinkSync(filePath);
    }
  }
}

function parseCsv(csvData) {
  const lines = csvData.replace(/\r\n/g, "\n").replace(/\r/g, "\n").split("\n");
  const headers = lines[0].split(",").map((header) => header.trim());
  return lines
    .slice(1)
    .filter((line) => line.trim() !== "") // Skip empty lines
    .map((line) => {
      const values = line.split(",").map((value) => {
        value = value.trim();
        return isNaN(value) || value === "" ? value : parseFloat(value);
      });
      return headers.reduce((obj, header, index) => {
        obj[header] = values[index];
        return obj;
      }, {});
    });
}

function getNameAndUnit(fullName) {
  let name = fullName;
  let unit = "";
  if (name.includes("[")) {
    name = name.split("[")[0].trim();
    unit = fullName.split("[")[1].split("]")[0];
  }
  return [name, unit];
}

function getNamesAndUnits(fullNames) {
  return fullNames.reduce(
    (acc, fullName) => {
      const [name, unit] = getNameAndUnit(fullName);
      acc[0].push(name);
      acc[1].push(unit);
      return acc;
    },
    [[], []],
  );
}

function convertToMoopRecord(decisionVariables, objectives) {
  // Extracting names and values for decision variables and objectives
  const decisionVariableFullNames = Object.keys(decisionVariables[0]);
  const [decisionVariableNames, decisionVariableUnits] = getNamesAndUnits(
    decisionVariableFullNames,
  );
  const decisionVariableValues = decisionVariables.map((row) =>
    decisionVariableFullNames.map((name) => row[name]),
  );

  const objectiveFullNames = Object.keys(objectives[0]);
  const [objectiveNames, objectiveUnits] = getNamesAndUnits(objectiveFullNames);
  const objectiveValues = objectives.map((row) =>
    objectiveFullNames.map((name) => row[name]),
  );

  return {
    decisionVariables: {
      names: decisionVariableNames,
      units: decisionVariableUnits,
      values: decisionVariableValues,
    },
    objectives: {
      names: objectiveNames,
      units: objectiveUnits,
      values: objectiveValues,
    },
  };
}

function readCsvFile(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(parseCsv(data));
      }
    });
  });
}

async function processAllMoops(baseDirectory, outputDirectory) {
  // Read the case study directories
  const caseStudies = fs
    .readdirSync(baseDirectory, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  for (const caseStudy of caseStudies) {
    const caseDir = path.join(baseDirectory, caseStudy);
    const moopFiles = fs.readdirSync(caseDir);
    const caseOutputDir = path.join(outputDirectory, caseStudy);
    clearDirectory(caseOutputDir);

    // Process each MOOP problem
    for (let i = 0; i < moopFiles.length; i += 2) {
      const decisionFilePath = path.join(caseDir, moopFiles[i]);
      const objectivesFilePath = path.join(caseDir, moopFiles[i + 1]);

      try {
        const decisionVariables = await readCsvFile(decisionFilePath);
        const objectives = await readCsvFile(objectivesFilePath);

        if (decisionVariables.length !== objectives.length) {
          throw new Error(
            "The number of rows in decision variables and objectives files do not match.",
          );
        }

        const moopRecords = convertToMoopRecord(decisionVariables, objectives);
        const outputFilePath = path.join(
          caseOutputDir,
          `moop${i / 2 + 1}.json`,
        );

        // Save the parsed data to a JSON file
        fs.mkdirSync(path.dirname(outputFilePath), { recursive: true });
        fs.writeFileSync(outputFilePath, JSON.stringify(moopRecords));
        console.log(`JSON data has been saved to ${outputFilePath}`);
      } catch (error) {
        console.error(
          `Error processing MOOP files for ${caseStudy}, moop${i / 2 + 1}:`,
          error,
        );
      }
    }
  }
}

const baseDirectory = "scripts/raw-data";
const outputDirectory = "src/content/moops";

processAllMoops(baseDirectory, outputDirectory);
