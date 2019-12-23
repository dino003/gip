<?php
namespace App\Repositories;

use Illuminate\Database\Eloquent\Model;

class Repository //implements RepositoryInterface
{
    // propiete model 
    protected $model;

    public function __construct(Model $model){
        $this->model = $model;
    }

        // retourne toutes les instances
        public function get(){
            return response()->json($this->model->all(), 200); 
        }

       // retourne toutes les instances
    public function all(){
        return response()->json($this->model->all(), 200); 
    }

    // creer une nouvelle instance
    public function create(array $data){
        return response()->json($this->model->create($data), 201);

        // $nouv = $this->model->create($data);

        // return response()->json($this->model->find($nouv->id) );
    }

     // modification
     public function update(array $data, $id)
     {
         $record = $this->model->find($id);
         return response()->json($record->update($data), 200);
     }

    // suppression
    public function delete($id){
        $this->model->destroy($id);
        return response()->json(null, 204);
    }

    // show
    public function show($id){
        return response()->json($this->model->findOrFail($id), 200);

    }

     // Get the associated model
     public function getModel()
     {
         return $this->model;
     }


     // Set the associated model
     public function setModel($model)
     {
         $this->model = $model;
         return $this;
     }
 
     // Eager load database relationships
     public function with($relations)
     {
         return $this->model->with($relations);
     }


}
