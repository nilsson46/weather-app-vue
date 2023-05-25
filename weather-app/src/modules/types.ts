export interface ForecastDataInterface {
    dt_txt: string; 

    main: {
        temp: number;
    };
    weather: {
        description: string;
    }[];
}