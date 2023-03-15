import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class AddOrderIdToOrdersMovie1678899900718 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
          'orders_movies',
          new TableColumn({
            name: 'order_id',
            type: 'uuid',
            isNullable: true,
          }),
        );
  
        await queryRunner.createForeignKey('orders_movies',
          new TableForeignKey({
            name: 'OrdersMoviesOrders',
            columnNames: ['order_id'],
            referencedTableName: 'orders',
            referencedColumnNames: ['id'],
            onDelete: 'SET NULL',
          })
        );
      }

      public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('orders_movies', 'OrdersMoviesOrders');
        await queryRunner.dropColumn('orders_movies', 'order_id');
      }
}
