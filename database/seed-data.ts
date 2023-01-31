
interface SeedData {
  entries: SeedEntry[];
}


interface SeedEntry {
  description: string;
  status: string;
  createdAt: number;
}


export const seedData: SeedData = {
  entries: [
    {
      description: 'Pendiente: Lorem ipsum sacta zuapete',
      status: 'pending',
      createdAt: Date.now()
    },
    {
      description: 'En-progreso: Lorem ipsum sacta zuapete',
      status: 'in-progress',
      createdAt: Date.now() - 1000000
    },
    {
      description: 'Terminadas: Lorem ipsum sacta zuapete',
      status: 'finished',
      createdAt: Date.now() - 100000
    }

  ]
}