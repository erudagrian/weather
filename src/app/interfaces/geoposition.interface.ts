import { MetricUnit } from './metricUnit.interface';

export interface GeoPosition {
        Latitude: number;
        Longitude: number;
        Elevation?: {
                Metric?: MetricUnit;
                Imperial?: MetricUnit;
        };
}
