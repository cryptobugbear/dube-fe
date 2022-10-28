import {
  DynamicPage,
  DynamicPageTitle,
  Button,
  Title,
  Label,
  Badge,
  Form,
  FormGroup,
  FormItem,
  Input,
} from "@ui5/webcomponents-react";
import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";

import styles from "./AddInventory.module.css";
interface Audit {
  createdBy: Member;
  createdAt: string;
}
interface Organization {
  Id: string;
  orgId: string;
  name: string;
  members: Array<Member>;
}
interface Member {
  Id: string;
  orgId: string;
  cognitoId: string;
  name: string;
}
interface WorkOrder {
  Id: string;
  name: string;
  image: string;
  description: string;
  status: string;
  type: string;
  audit: Audit;
}
interface AddInventoryProps {}
type Inputs = {
  id: string;
  name: string;
  imageS3: string;
  location: string;
  type: string;
  audit: Audit|'';
  organization: Organization|'';
  workOrders: Array<WorkOrder>|''; 
};

const AddInventory: FC<AddInventoryProps> = () => {
  let navigate = useNavigate();
  
  const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = data => console.log(data);

  return  (
  <div className={styles.AddInventory}>
    <DynamicPage
      showHideHeaderButton={false}
      headerTitle={
        <DynamicPageTitle
          actions={
            <>
              <Button
                id={"openPopoverBtn"}
                onClick={() => {
                  navigate("/");
                }}
                design="Attention"
              >
                Home
              </Button>

              <Button design="Attention">Scan</Button>
              <Button design="Emphasized">Login!</Button>
            </>
          }
          header={<Title>Dube </Title>}
          // subHeader={<Label>{quote}</Label>}
        >
          <Badge>Status: OK</Badge>
        </DynamicPageTitle>
      }
    >
      <Form
        style={{
          alignItems: 'center'
        }}>
          
        <FormItem label="Name">
          <Input defaultValue="test" {...register("name")} />
        </FormItem>
        <FormGroup titleText="Inventory Information">
          <FormItem label="Photo">
            <Input {...register("imageS3", { required: true })}/>
          </FormItem>
          <FormItem label={<Label>Location</Label>}>
            <Input {...register("location", { required: true })}/>
          </FormItem>
          </FormGroup>

        </Form>
        <Button
            icon="employee"
            onClick={handleSubmit(onSubmit)}
          >
            Submit Inventory
          </Button>
    </DynamicPage>
  </div>
);
    }

export default AddInventory;
