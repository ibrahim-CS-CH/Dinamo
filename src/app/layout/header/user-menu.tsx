import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function UserMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage
            src={
              "https://media.licdn.com/dms/image/v2/D4D0BAQGKZROW9HS5oA/company-logo_200_200/company-logo_200_200/0/1727106223229/dinamo_mea_logo?e=1741219200&v=beta&t=fo_4KuEZd7mZLHzhiAgSgjUguTaoyUcTRVkgeen6a9Q"
            }
            className="h-10 w-10"
          />
          <AvatarFallback>{"Dinamo".slice(0, 2)}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-64" align="end">
        menu here
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
