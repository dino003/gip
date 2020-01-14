<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\User;
use App\StructureRegroupement;
use App\TypeEntite;
use App\Tier;
use App\Personnel;
use App\Theme;



class SetupSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
      
               //  user par  defaut
               $struc = new User;

               $struc->name = "Administrateur";
               $struc->email = "admin@admin.com";
               $struc->username = "maitre";
               $struc->password = bcrypt('adminparc');
               $struc->isAdmin = 1;
               $struc->periode_essai = now()->addDays(config('app.free_trial_days'));


       
               $struc->save();
       
               // fin user par  defaut

              //  structure par  defaut
        $struc = new StructureRegroupement;

        $struc->code_regroupement = "SIEGE";
        $struc->nom_regroupement = "SIEGE";

        $struc->save();

        // fin structure par  defaut


        //  type entite par  defaut
        $ent = new TypeEntite;
        $ent->type_entite = "SIEGE";
        $ent->save();

    // fin type entite par  defaut


    //  fournisseur par  defaut

        $tier = new Tier;

        $tier->code = "DEFAUT";
        $tier->nom = "FOURNISSEUR PAR DEFAUT";


        $tier->save();

    // fin fournisseur par  defaut


    // personne par Par defaut 
        $pers = new Personnel;

        $pers->nom = "DEFAUT";
        $pers->nom = "PERSONNE PAR DEFAUT";

        $pers->default = 1;
        $pers->personne_prioritaire = 1;
      //  $pers->entite_affectation = $request->get('nom');
        $pers->save();

        // fin personne par par defaut

        // theme par defaut 
            $theme = new Theme;
            $theme->navbar = "app-header header-shadow bg-primary header-text-light";
            $theme->sidebar = "app-sidebar sidebar-shadow";
            $theme->save();


        // fin theme
    }
}
