import { AdministrativeArea } from './administrativeArea.interface';
import { GeoPosition } from './geoposition.interface';
import { Region } from './region.interface';
import { TimeZone } from './timezone.interface';

export interface City {
    Version: number;
    Key: number;
    Type: string;
    Rank: string;
    LocalizedName: string;
    EnglishName: string;
    PrimaryPostalCode: string;
    Region: Region;
    Country: Region;
    AdministrativeArea?: AdministrativeArea;
    TimeZone: TimeZone;
    GeoPosition: GeoPosition;
    IsAlias: boolean;
    SupplementalAdminAreas?: AdministrativeArea[];
    DataSets: string[];
}
