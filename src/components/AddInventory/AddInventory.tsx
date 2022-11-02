import {
  Button,
  Title,
  Label,
  Form,
  FormItem,
  Input,
  FlexBox,
  RadioButton,
  Toolbar,
  ToolbarSpacer,
} from "@ui5/webcomponents-react";
import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Asset } from "types";
import { AssetTypes } from "enums";
import useAssetTypeNames from "hooks/useAssetTypeNames";
import "@ui5/webcomponents/dist/features/InputElementsFormSupport";

interface AddInventoryProps {}

type AddInventoryPayload = Pick<
  Asset,
  "name" | "imageS3" | "location" | "type"
>;

const AddInventory: FC<AddInventoryProps> = () => {
  const navigate = useNavigate();
  const assetTypeNames = useAssetTypeNames();

  const [data, setData] = useState<AddInventoryPayload>({
    name: "",
    imageS3: "",
    location: "",
    type: AssetTypes.Appliances,
  });

  return (
    <>
      <FlexBox alignItems="Center">
        <Button style={{ marginRight: 16 }} onClick={() => navigate("/")}>
          Back
        </Button>
        <Title>Add Inventory</Title>
      </FlexBox>

      <Form style={{ alignItems: "center" }} onSubmit={console.log}>
        <FormItem label="Name">
          <Input
            value={data.name}
            onChange={(e) =>
              setData((curr) => ({ ...curr, name: e.target.value }))
            }
          />
        </FormItem>
        <FormItem label="Photo">
          <Input
            value={data.imageS3}
            onChange={(e) =>
              setData((curr) => ({ ...curr, imageS3: e.target.value }))
            }
          />
        </FormItem>
        <FormItem label={<Label>Location</Label>}>
          <Input
            value={data.location}
            onChange={(e) =>
              setData((curr) => ({ ...curr, location: e.target.value }))
            }
          />
        </FormItem>
        <FormItem label={<Label>Asset Type</Label>}>
          <FlexBox alignItems="Center">
            {[AssetTypes.Appliances].map((type) => (
              <RadioButton
                key={type}
                name="type"
                text={assetTypeNames[type]}
                value={AssetTypes.Appliances}
                checked={type === data.type}
                onChange={() => setData((curr) => ({ ...curr, type }))}
              />
            ))}
          </FlexBox>
        </FormItem>
      </Form>

      <Toolbar>
        <ToolbarSpacer />
        <Button onClick={() => console.log(data)}>Submit Inventory</Button>
      </Toolbar>
    </>
  );
};

export default AddInventory;
