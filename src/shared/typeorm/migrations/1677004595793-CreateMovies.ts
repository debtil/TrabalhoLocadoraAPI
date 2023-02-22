import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateMovies1677004595793 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'movies',
                columns: [
                    {name: 'id', type: 'uuid', isPrimary: true, generationStrategy: 'uuid', default: 'uuid_generate_v4()'},
                    {name: 'name', type: 'varchar'},
                    {name: 'price', type: 'decimal', precision: 10, scale: 2},
                    {name: 'year', type: 'int'},
                    {name: 'director', type:'varchar'},
                    {name: 'studio', type:'varchar'},
                    {name: 'duration', type: 'int'},
                    {name: 'genre', type: 'varchar'},
                    {name: 'created_at', type: 'timestamp', default: 'now()'},
                    {name: 'updated_at', type: 'timestamp', default: 'now()'}
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('movies');
    }

}
