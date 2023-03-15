import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class AddMovieIdToOrdersMovie1678900433656 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
          'orders_movies',
          new TableColumn({
            name: 'movie_id',
            type: 'uuid',
            isNullable: true,
          }),
        );
    
        await queryRunner.createForeignKey('orders_movies',
          new TableForeignKey({
            name: 'OrdersMoviesMovie',
            columnNames: ['movie_id'],
            referencedTableName: 'movies',
            referencedColumnNames: ['id'],
            onDelete: 'SET NULL',
          })
        );
      }

      public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('orders_movies', 'OrdersMoviesMovie');
        await queryRunner.dropColumn('orders_movies', 'movie_id');
      }
}
