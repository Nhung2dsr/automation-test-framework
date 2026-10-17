// Tạo đường dẫn đến các thư mục của project.

import path from 'path';
import { projectConfig } from './project.config';

const projectRoot = projectConfig.root;

export const paths = {
    project: projectRoot,

    fixtures: path.join(projectRoot, 'fixtures'),

    objects: path.join(projectRoot, 'objects'),

    testcases: path.join(projectRoot, 'testcases'),

    testdata: path.join(projectRoot, 'testdata'),

    tests: path.join(projectRoot, 'tests'),

    pages: path.join(projectRoot, 'pages')
};