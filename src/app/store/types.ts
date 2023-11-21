export interface RootState {
    filters: FilterState;
  }
  
  export interface FilterState {
    startDate: string | null;
    endDate: string | null;
    account: string;
    industry: string;
    state: string;
  }