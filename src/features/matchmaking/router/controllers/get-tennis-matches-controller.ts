import { Request, Response } from 'express';
import GetTennisMatches from '../../domain/usecases/get-tennis-matches';
import logger from '../../../../core/logger';
import { District } from '../../../../domain/district';

export class GetTennisMatchesController {
  constructor() {}

  async handle(req: Request, res: Response) {
    try {
      function decodeStringifiedArray(input: string): string[] {
        // Use a regular expression to match anything between square brackets
        const matches = input.match(/\[(.*?)\]/);
        if (!matches) {
          return [];
        }

        // Split the string by comma only if there's content inside the brackets
        const content = matches[1].trim();
        if (!content) {
          return [];
        }

        // Split by comma, then trim each value and remove any potential quotes
        return content
          .split(',')
          .map((s) => s.trim().replace(/'/g, '').replace(/"/g, ''));
      }

      const offsetQuery = req.query.offset as string;
      const parsedOffset = parseInt(offsetQuery);
      const offset = isNaN(parsedOffset) ? 0 : parsedOffset;

      const lowerNtrpLevelQuery = req.query.lowerNtrpLevel as string;
      const upperNtrpLevelQuery = req.query.upperNtrpLevel as string;
      const selectedDistrictsQuery = req.query.selectedDistricts as string;

      const parsedLowerNtrpLevel = parseFloat(lowerNtrpLevelQuery);
      const lowerNtrpLevel = isNaN(parsedLowerNtrpLevel)
        ? 1.0
        : parsedLowerNtrpLevel;

      const parsedUpperNtrpLevel = parseFloat(upperNtrpLevelQuery);
      const upperNtrpLevel = isNaN(parsedUpperNtrpLevel)
        ? 1.0
        : parsedUpperNtrpLevel;

      const strippedInput = decodeStringifiedArray(selectedDistrictsQuery);
      console.dir(strippedInput);

      const selectedDistricts = Array.isArray(strippedInput)
        ? (strippedInput as District[])
        : [];

      const result = await new GetTennisMatches().execute({
        offset,
        lowerNtrpLevel,
        upperNtrpLevel,
        selectedDistricts
      });

      switch (result.message) {
        case 'GET_TENNIS_MATCHES_SUCCESS':
          return res.status(200).json(result);
        case 'GET_TENNIS_MATCHES_FAILURE':
          return res.status(500).json(result);
      }
    } catch (err) {
      logger.error(err);
      console.error(err);
      res.status(500).send({ message: 'Internal server error' });
    }
  }
}
