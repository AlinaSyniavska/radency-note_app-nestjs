import {Injectable} from '@nestjs/common';
import {IStats} from "../interfaces/statistics.interface";
import {noteCategoryEnum} from "../constants/noteCategoryEnum";
import {IStatsFull} from "../interfaces/statisticFull.interface";

@Injectable()
export class HelperService {
    constructor() {
    }

    formStatistics(actStatus: IStats[], archStatus: IStats[]): IStatsFull[]  {
        return [
            {
                category: noteCategoryEnum.IDEA,
                active: actStatus.find(item => item.category === noteCategoryEnum.IDEA)?.total || 0,
                archived: archStatus.find(item => item.category === noteCategoryEnum.IDEA)?.total || 0,
            },
            {
                category: noteCategoryEnum.TASK,
                active: actStatus.find(item => item.category === noteCategoryEnum.TASK)?.total || 0,
                archived: archStatus.find(item => item.category === noteCategoryEnum.TASK)?.total || 0,
            },
            {
                category: noteCategoryEnum.RANDOM_THOUGHT,
                active: actStatus.find(item => item.category === noteCategoryEnum.RANDOM_THOUGHT)?.total || 0,
                archived: archStatus.find(item => item.category === noteCategoryEnum.RANDOM_THOUGHT)?.total || 0,
            },
        ];
    }
}
