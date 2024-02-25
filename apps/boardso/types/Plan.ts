export interface Plan {
    id:          number;
    amount:      number;
    name:        string;
    currency:    string;
    description: string;
    number:      number;
    period:      string;
    discount:    any[];
}
