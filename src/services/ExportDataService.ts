import fs from 'fs';
import path from 'path';

import { log } from '../utils/log';
import { tmpPath } from '../config/defaultPaths';
import format from '../config/format';
import InterfaceJsonContent from '../models/InterfaceJsonContent';

export default class ExportDataService {
    private fileType = 'json';
    private content: InterfaceJsonContent;

    constructor(content: InterfaceJsonContent) {
        this.content = content;
    }

    public execute(videoFormat: 'portrait' | 'landscape' | 'square'): void {
        const dataFilename = `${this.content.timestamp}.${this.fileType}`;

        this.content.width = format[videoFormat].width;
        this.content.height = format[videoFormat].height;

        log(`Exporting data to ${dataFilename}`, 'ExportDataService');
        fs.writeFileSync(
            path.resolve(tmpPath, dataFilename),
            JSON.stringify(this.content),
        );
    }
}
