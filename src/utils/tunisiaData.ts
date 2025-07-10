import * as fs from 'fs';
import * as path from 'path';

interface TunisiaLocation {
  governorate: string;
  delegation: string;
}

interface GovernorateData {
  name: string;
  delegations: string[];
}

export class TunisiaDataService {
  private static instance: TunisiaDataService;
  private governoratesData: GovernorateData[] = [];
  private allLocations: TunisiaLocation[] = [];

  private constructor() {
    this.loadData();
  }

  public static getInstance(): TunisiaDataService {
    if (!TunisiaDataService.instance) {
      TunisiaDataService.instance = new TunisiaDataService();
    }
    return TunisiaDataService.instance;
  }

  private loadData(): void {
    try {
      const csvPath = path.join(__dirname, '../../List-of-Tunisian-Governorates-EN.csv');
      const csvContent = fs.readFileSync(csvPath, 'utf-8');
      
      // Parse CSV content
      const lines = csvContent.split('\n').filter(line => line.trim() !== '');
      const locations: TunisiaLocation[] = [];
      
      // Skip header line
      for (let i = 1; i < lines.length; i++) {
        const [governorate, delegation] = lines[i].split(';');
        if (governorate && delegation) {
          locations.push({
            governorate: governorate.trim(),
            delegation: delegation.trim()
          });
        }
      }

      this.allLocations = locations;
      
      // Group by governorate
      const governorateMap = new Map<string, string[]>();
      
      locations.forEach(location => {
        if (!governorateMap.has(location.governorate)) {
          governorateMap.set(location.governorate, []);
        }
        governorateMap.get(location.governorate)!.push(location.delegation);
      });

      // Convert to array format
      this.governoratesData = Array.from(governorateMap.entries()).map(([name, delegations]) => ({
        name,
        delegations: delegations.sort()
      }));

      console.log(`✅ Loaded ${this.governoratesData.length} governorates with ${this.allLocations.length} total locations`);
    } catch (error) {
      console.error('❌ Error loading Tunisia data:', error);
      // Fallback data
      this.governoratesData = [
        { name: 'Gafsa', delegations: ['Gafsa Nord', 'Gafsa Sud', 'El Ksar', 'El Guetar', 'Belkhir', 'Mdhilla', 'Metlaoui', 'Oum El Araies', 'Redeyef', 'Sidi Aïch', 'Sned'] },
        { name: 'Tunis', delegations: ['Bab El Bhar', 'Bab Souika', 'Carthage', 'Cité El Khadra', 'Djebel Jelloud', 'El Kabaria', 'El Menzah', 'El Omrane', 'El Omrane supérieur', 'El Ouardia', 'Ettahrir', 'Ezzouhour', 'Hraïria', 'La Goulette', 'La Marsa', 'Le Bardo', 'Le Kram', 'Médina', 'Séjoumi', 'Sidi El Béchir', 'Sidi Hassine'] },
        { name: 'Sfax', delegations: ['Agareb', 'Bir Ali Ben Khalifa', 'El Amra', 'El Hencha', 'Graïba', 'Jebiniana', 'Kerkennah', 'Mahrès', 'Menzel Chaker', 'Sakiet Eddaïer', 'Sakiet Ezzit', 'Sfax Ouest', 'Sfax Sud', 'Sfax Ville', 'Skhira', 'Thyna'] }
      ];
    }
  }

  public getAllGovernorates(): string[] {
    return this.governoratesData.map(g => g.name).sort();
  }

  public getDelegationsByGovernorate(governorate: string): string[] {
    const governorateData = this.governoratesData.find(g => g.name === governorate);
    return governorateData ? governorateData.delegations : [];
  }

  public getAllLocations(): TunisiaLocation[] {
    return this.allLocations;
  }

  public getGovernoratesData(): GovernorateData[] {
    return this.governoratesData;
  }

  public isValidLocation(governorate: string, delegation: string): boolean {
    return this.allLocations.some(loc => 
      loc.governorate === governorate && loc.delegation === delegation
    );
  }
} 