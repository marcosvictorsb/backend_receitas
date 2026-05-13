export class RecipeEntity {
  public readonly id?: number;
  public readonly id_user: number;
  public readonly name_category?: string;
  public readonly id_category?: number;
  public readonly name?: string;
  public readonly preparation_time_minutes?: number;
  public readonly servings?: number;
  public readonly preparation_method: string[];
  public readonly ingredients?: string[];
  public readonly created_at?: Date;
  public readonly updated_at?: Date;

  constructor(params: {
    id?: number;
    id_user: number;
    categorias?: { name: string };
    id_category?: number;
    name?: string;
    preparation_time_minutes?: number;
    servings?: number;
    preparation_method: string | string[];
    ingredients?: string | string[];
    created_at?: Date;
    updated_at?: Date;
  }) {
    this.id = params?.id;
    this.id_user = params.id_user;
    this.name_category = params?.categorias?.name;
    this.id_category = params?.id_category;
    this.name = params?.name;
    this.preparation_time_minutes = params?.preparation_time_minutes;
    this.servings = params?.servings;
    this.preparation_method = this.toArray(params.preparation_method);
    this.ingredients = this.toArray(params?.ingredients);
    this.created_at = params?.created_at;
    this.updated_at = params?.updated_at;
  }

  private toArray(value?: string | string[]): string[] {
    if (!value) return [];
    if (Array.isArray(value))
      return value.map((item) => item.trim()).filter(Boolean);

    const parsed = JSON.parse(value);
    if (Array.isArray(parsed)) {
      return parsed.map((item) => String(item).trim()).filter(Boolean);
    }

    if (value.includes(';')) {
      return value
        .split(';')
        .map((item) => item.trim())
        .filter(Boolean);
    }

    const single = value.trim();
    return single ? [single] : [];
  }
}
