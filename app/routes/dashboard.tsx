
import { Activity, BicepsFlexed, Brain, Calendar } from "lucide-react";
import { useState } from "react";
import { Form, Link, Outlet, redirect, useLoaderData, useLocation } from "react-router";
import { Modal } from "~/components/Modal";
import { Section } from "~/components/ui/Section";
import { Title } from "~/components/ui/Title";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { Textarea } from "~/components/ui/textarea";
import { cn } from "~/lib/utils";
import { healthEntriesSchema, healthEntrySchema } from "~/schema/healthEntries";
import { getUserToken } from "~/session.server";
import type { Route } from "./+types/dashboard";

export const loader = async ({ request }: Route.LoaderArgs) => {
  
  // Récupération du token JWT
  const token = await getUserToken({ request });
  if(!token) {
    return redirect('/login');
  }
  
  try {
    // Appel API pour récupérer les informations du patient
    // Le backend utilise le JWT pour identifier l'utilisateur
    const response = await fetch(process.env.BACKEND_URL + 'patients/health-entries', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });

    if (!response.ok) {
      throw new Error(`Erreur API: ${response.status}`);
    }

    const responseData = await response.json();
    const healthEntries = healthEntriesSchema.parse(responseData);
    
    return { data: healthEntries };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Erreur lors du chargement des données:', error);
    return { data: [] };
  }
};
export const action = async ({ request }: Route.ActionArgs) => {
  try {
    const formData = await request.formData();
    const rawData = healthEntrySchema.parse({ ...Object.fromEntries(formData), global: (Number(formData.get('physical')) + Number(formData.get('mental'))) / 2, physical: Number(formData.get('physical')), mental: Number(formData.get('mental')) });
    
    const token = await getUserToken({ request });
    
    const response = await fetch(process.env.BACKEND_URL + 'patients/health-entry', {
      method: 'POST',
      body: JSON.stringify(rawData),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });
    
    if (!response.ok) {
      throw new Error(`Erreur API: ${response.status}`);
    }
    
    return redirect('/dashboard?success=true');
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Erreur lors de la sauvegarde:', error)
    return { error: 'Erreur lors de la sauvegarde' };
  }
};
export default function Layout() {
  const { data } = useLoaderData<typeof loader>();
  const today = new Date();
  const [endDate, setEndDate] =  useState(new Date(today.getDate() - 7));
 const todayHealthEntry = data.filter(entry => entry.createdAt.toDateString() === today.toDateString())[0];
 const [openModal, setOpenModal] = useState(false);
  // La modal se ferme automatiquement grâce au redirect vers une URL différente
  
  return (
    <>
    
      <Section className="px-2.5 lg:px-8 py-5.5 lg:pt-6 lg:pb-8 flex flex-col gap-4">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-2.5">
          <Title className="text-primary text-3xl font-bold">Tableau de bord</Title>
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-2 lg:gap-4">

          <div className="flex items-center gap-2  text-primary lg:order-2">
            <Calendar className="size-4" />
            <p className="text-sm font-medium">{today.toLocaleDateString()} - {endDate.toLocaleDateString()}</p>
            </div>
            {todayHealthEntry ? null : <>
              <Button variant='secondary' className='lg:order-1' onClick={() => setOpenModal(true)}>

Noter ma journée
              </Button>
              <Modal open={openModal} onClose={() => setOpenModal(false)} title="Ajouter un état de santé"><Form method="POST" className="flex flex-col gap-4">
               
               <Input type="number" max={10} min={0} name="physical" placeholder="Note physique" />
               <Input type="number" max={10} min={0} name="mental" placeholder="Note morale" />
               <Input type='text' name='limbs' placeholder="Endroit" />
               
               <Input type='text' name='feeling' placeholder="Sentiment" />
               <Textarea name='description' placeholder="Description" />
               <div className="flex items-center justify-between gap-2 mt-7">
               <Button variant='ghost' onClick={() => setOpenModal(false)}>Annuler</Button>   <Button type="submit">Confimer</Button> 
                 </div>
             </Form>
           </Modal>
              </>}
            
            
              
            
          <Button className="lg:order-3">Exporter le bilan</Button>
          </div>
        </div>
        
        <Nav />
        <div className="flex flex-col px-6 lg:px-0 lg:flex-row gap-4">
      
          <StatisticsCard icon={  <Select onValueChange={(value) => setEndDate(new Date(today.getDate() - parseInt(value)))}>
          <SelectTrigger  className="w-full p-0 border-none shadow-none !h-5 !py-0 !min-h-5">
          <SelectValue className="p-0 !h-5 !leading-5 text-xs" placeholder="Sélectionner une période" />
          </SelectTrigger>
            <SelectContent className="bg-white rounded-md shadow-sm">
              <SelectGroup>
            <SelectItem className="text-xs focus:bg-gray-50 " value="7">Cette semaine</SelectItem>
            <SelectItem className="text-xs focus:bg-gray-50" value="30">Ce mois ci</SelectItem>
            <SelectItem className="text-xs focus:bg-gray-50" value="90">Ce trimestre</SelectItem>
            <SelectItem className="text-xs focus:bg-gray-50" value="365">Cette année</SelectItem>
                <SelectItem className="text-xs focus:bg-gray-50" value="Toute la vie">Toute la vie</SelectItem>
                </SelectGroup>
          </SelectContent>
            </Select>} title="" score={todayHealthEntry?.global} scoreLastPeriod={data.filter(entry => entry.createdAt.toDateString() > today.toDateString() && entry.createdAt.toDateString() < endDate.toDateString())[0]?.global ?? 0} />
       
          
            <StatisticsCard icon={<BicepsFlexed className="size-4" />} title="Physique" score={todayHealthEntry?.physical} scoreLastPeriod={data.filter(entry => entry.createdAt.toDateString() > today.toDateString() && entry.createdAt.toDateString() < endDate.toDateString())[0]?.physical ?? 0} />
            <StatisticsCard icon={<Brain className="size-4" />} title="Moral" score={todayHealthEntry?.mental} scoreLastPeriod={data.filter(entry => entry.createdAt.toDateString() > today.toDateString() && entry.createdAt.toDateString() < endDate.toDateString())[0]?.mental ?? 0} />
          <StatisticsCard icon={<Activity className="size-4" />} title="Aujourd'hui"  scoreLastPeriod={todayHealthEntry?.global ?? 0} score={todayHealthEntry?.global ?? 0} />

          </div>
    </Section>
      <Outlet />
    </>
  );
}
function NavItem({ to, children }: { to: string, children: React.ReactNode }) {
  const pathname = useLocation().pathname;
  // Pour la route principale dashboard, vérifier égalité exacte
  // Pour les sous-routes, utiliser startsWith
  const active = to === '/dashboard' 
    ? pathname === '/dashboard' 
    : pathname.startsWith(to);
  
  return (
    <li >
      <Link to={to} className={cn(active ? 'text-primary shadow-sm rounded-md' : 'opacity-50 text-black', 'px-3  py-1.5 text-sm font-medium ')}>{children}</Link>
    </li>
  )
}
function Nav() {

  return (
    <nav className="px-5 lg:px-0">
      <ul className="flex items-center  justify-center lg:justify-start flex-wrap gap-0.5">
      <NavItem to='/dashboard'>Général</NavItem>
      <NavItem to='/dashboard/treatments'>Traitements</NavItem>
      <NavItem to='/dashboard/appointments'>RDV</NavItem>
       
          <NavItem to='/dashboard/notes'>Mes notes</NavItem>
       
          <NavItem to='/dashboard/documents'>Mes documents</NavItem>
       
      </ul>
    </nav>
  );
}
export const StatisticsCard = ({icon, title, score, scoreLastPeriod}: {icon: React.ReactNode, title: string, score?: number, scoreLastPeriod: number}) => {

  return <Card className="shadow-sm border-none gap-0">
            <CardHeader>
            
               
                <CardTitle className="text-primary text-sm font-medium flex items-center justify-between">{title} {icon}</CardTitle>
               
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-2">
                <p className="text-2xl font-bold text-primary">{score ? `${score}/10` : "À faire"}</p>
                <p className="text-sm font-medium">{scoreLastPeriod > 0 && score ? `${((score - scoreLastPeriod) / scoreLastPeriod * 100).toFixed(1) }% par rapport à la période précédente` : "Vous n'avez pas encore de note"}</p>
              </div>
            </CardContent>
          </Card>
}
