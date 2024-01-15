export class UserDto {
    id: number
    name: string
    uf: string
    city: string
    document: number
    document_type: string
    cultivation: [{ farm_name: string, product_id: number, product_name: string }]
}