import { User,columns } from "./columns";
import { DataTable } from "./data-table";

const getData = async (): Promise<User[]> => {
  return [
    {
      id: "728ed521",
      status: "active",
      fullName: "John Doe",
      avatar: "https://github.com/shadcn.png",
      email: "johndoe@gmail.com",
    },
    {
      id: "728ed522",
      status: "inactive",
      fullName: "Jane Doe",
      avatar: "https://github.com/shadcn.png",
      email: "janedoe@gmail.com",
    },
    {
      id: "728ed523",
      status: "active",
      fullName: "Mike Galloway",
      avatar: "https://github.com/shadcn.png",
      email: "mikegalloway@gmail.com",
    },
    {
      id: "728ed524",
      status: "inactive",
      fullName: "Minerva Robinson",
      avatar: "https://github.com/shadcn.png",
      email: "minerbarobinson@gmail.com",
    },
    {
      id: "728ed525",
      status: "active",
      fullName: "Mable Clayton",
      avatar: "https://github.com/shadcn.png",
      email: "mableclayton@gmail.com",
    },
    {
      id: "728ed526",
      status: "inactive",
      fullName: "Nathan McDaniel",
      avatar: "https://github.com/shadcn.png",
      email: "nathanmcdaniel@gmail.com",
    },
    {
      id: "728ed527",
      status: "active",
      fullName: "Myrtie Lamb",
      avatar: "https://github.com/shadcn.png",
      email: "myrtielamb@gmail.com",
    },
    {
      id: "728ed528",
      status: "active",
      fullName: "Leona Bryant",
      avatar: "https://github.com/shadcn.png",
      email: "leonabryant@gmail.com",
    },
    {
      id: "728ed529",
      status: "inactive",
      fullName: "Aaron Willis",
      avatar: "https://github.com/shadcn.png",
      email: "aaronwillis@gmail.com",
    },
    {
      id: "728ed52a",
      status: "active",
      fullName: "Joel Keller",
      avatar: "https://github.com/shadcn.png",
      email: "joelkeller@gmail.com",
    },
    {
      id: "728ed52b",
      status: "inactive",
      fullName: "Daniel Ellis",
      avatar: "https://github.com/shadcn.png",
      email: "danielellis@gmail.com",
    },
    {
      id: "728ed52c",
      status: "active",
      fullName: "Gordon Kennedy",
      avatar: "https://github.com/shadcn.png",
      email: "gordonkennedy@gmail.com",
    },
    {
      id: "728ed52d",
      status: "inactive",
      fullName: "Emily Hoffman",
      avatar: "https://github.com/shadcn.png",
      email: "emilyhoffman@gmail.com",
    },
    {
      id: "728ed52e",
      status: "active",
      fullName: "Jeffery Garrett",
      avatar: "https://github.com/shadcn.png",
      email: "jefferygarrett@gmail.com",
    },
    {
      id: "728ed52f",
      status: "active",
      fullName: "Ralph Baker",
      avatar: "https://github.com/shadcn.png",
      email: "ralphbaker@gmail.com",
    },
    {
      id: "728ed52g",
      status: "inactive",
      fullName: "Seth Fields",
      avatar: "https://github.com/shadcn.png",
      email: "sethfields@gmail.com",
    },
    {
      id: "728ed52h",
      status: "active",
      fullName: "Julia Webb",
      avatar: "https://github.com/shadcn.png",
      email: "juliawebb@gmail.com",
    },
    {
      id: "728ed52i",
      status: "active",
      fullName: "Gary Banks",
      avatar: "https://github.com/shadcn.png",
      email: "garybanks@gmail.com",
    },
    {
      id: "728ed52j",
      status: "inactive",
      fullName: "Flora Chambers",
      avatar: "https://github.com/shadcn.png",
      email: "florachambers@gmail.com",
    },
    {
      id: "728ed52k",
      status: "active",
      fullName: "Steve Hanson",
      avatar: "https://github.com/shadcn.png",
      email: "stevehanson@gmail.com",
    },
    {
      id: "728ed52l",
      status: "active",
      fullName: "Lola Robinson",
      avatar: "https://github.com/shadcn.png",
      email: "lolarobinson@gmail.com",
    },
    {
      id: "728ed52m",
      status: "inactive",
      fullName: "Ethel Waters",
      avatar: "https://github.com/shadcn.png",
      email: "ethelwaters@gmail.com",
    },
    {
      id: "728ed52n",
      status: "active",
      fullName: "Grace Edwards",
      avatar: "https://github.com/shadcn.png",
      email: "graceedwards@gmail.com",
    },
    {
      id: "728ed52o",
      status: "active",
      fullName: "Sallie Wong",
      avatar: "https://github.com/shadcn.png",
      email: "salliewong@gmail.com",
    },
    {
      id: "728ed52p",
      status: "active",
      fullName: "Bryan Gutierrez",
      avatar: "https://github.com/shadcn.png",
      email: "bryangutierrez@gmail.com",
    },
    {
      id: "728ed52q",
      status: "inactive",
      fullName: "Erik Rice",
      avatar: "https://github.com/shadcn.png",
      email: "erikrice@gmail.com",
    },
    {
      id: "728ed52r",
      status: "active",
      fullName: "Jordan Atkins",
      avatar: "https://github.com/shadcn.png",
      email: "jordanatkins@gmail.com",
    },
    {
      id: "728ed52s",
      status: "inactive",
      fullName: "Bill Brewer",
      avatar: "https://github.com/shadcn.png",
      email: "billbrewer@gmail.com",
    },
    {
      id: "728ed52t",
      status: "active",
      fullName: "Edwin Morris",
      avatar: "https://github.com/shadcn.png",
      email: "edwinmorris@gmail.com",
    },
    {
      id: "728ed52u",
      status: "active",
      fullName: "Harold Becker",
      avatar: "https://github.com/shadcn.png",
      email: "haroldbecker@gmail.com",
    },
    {
      id: "728ed52v",
      status: "active",
      fullName: "Hannah Rodriguez",
      avatar: "https://github.com/shadcn.png",
      email: "hannahrodriguez@gmail.com",
    },
    {
      id: "728ed52w",
      status: "active",
      fullName: "Zachary Beck",
      avatar: "https://github.com/shadcn.png",
      email: "zacharybeck@gmail.com",
    },
    {
      id: "728ed52x",
      status: "inactive",
      fullName: "Frances Potter",
      avatar: "https://github.com/shadcn.png",
      email: "francespotter@gmail.com",
    },
    {
      id: "728ed52y",
      status: "active",
      fullName: "Raymond Murray",
      avatar: "https://github.com/shadcn.png",
      email: "raymondmurray@gmail.com",
    },
    {
      id: "728ed52z",
      status: "active",
      fullName: "Adam Sherman",
      avatar: "https://github.com/shadcn.png",
      email: "adamsherman@gmail.com",
    },
    {
      id: "728ed521f",
      status: "inactive",
      fullName: "Anne Cruz",
      avatar: "https://github.com/shadcn.png",
      email: "annecruz@gmail.com",
    },
  ];
};

const UsersPage = async () => {
  const data = await getData();
  return (
    <div className="">
      <div className="mb-8 px-4 py-2 bg-secondary rounded-md">
        <h1 className="font-semibold">All Users</h1>
      </div>
      <DataTable columns={columns} data={data}/>
    </div>
  );
};


export default UsersPage;
