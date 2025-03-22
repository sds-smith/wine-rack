'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CategorySelect from "../controlled_inputs/CategorySelect";
import ProducerSelect from "../controlled_inputs/ProducerSelect";
import WineSelect from "../controlled_inputs/WineSelect";
import { Category, Wine } from "@/app/types/wine";


const defaultCategory = { ID: '', code: ' ', title: 'Please select category', group: '', color: ''};


type MobileSearchFormProps = {
    categories: Category[],
    wineList: Wine[]
}

export default function MobileSearchForm({ categories, wineList } : MobileSearchFormProps) {
    const router = useRouter();

    const [ selectedCategory, setSelectedCategory ] = useState<Category>(defaultCategory);
    const [ selectedProducer, setSelectedProducer ] = useState<string>('');
    const [ selectedWine, setSelectedWine ] = useState<Wine>();

    const categoryFilter = (wine: Wine) => selectedCategory.ID ? wine.Category === selectedCategory.code : true;
    const producerFilter = (wine: Wine) => selectedProducer    ? wine.Producer === selectedProducer      : true;

    const filteredWineList = wineList.filter(categoryFilter).filter(producerFilter);

    const producers: string[] = [ ...new Set(wineList.filter(categoryFilter).map(({ Producer }: Wine) => Producer).sort())]

    const handleSelectCategory = (newSelected: Category) => {
        setSelectedCategory(newSelected);
        setSelectedProducer('');
        setSelectedWine(undefined)
    };
    const handleSelectProducer = (newSelected: string) => {
        setSelectedProducer(newSelected);
        setSelectedWine(undefined)
    };
    const handleSelectWine = (newSelected: Wine) => setSelectedWine(newSelected)

    const handleSearch = () => router.push(`/mobile/view/${selectedWine?.ID}`)

    return (
        <Container sx={{minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly'}}>
            <h2>Search Current Inventory</h2>
            <CategorySelect 
                categories={categories} 
                variant={'outlined'} 
                handleSelectCategory={handleSelectCategory}
                selectedCategory={selectedCategory}
            /> 
            <ProducerSelect 
                producers={producers}
                variant={'outlined'}
                handleSelectProducer={handleSelectProducer}
                selectedProducer={selectedProducer}
            />
            <WineSelect
                wines={filteredWineList}
                variant={'outlined'}
                handleSelectWine={handleSelectWine}
                selectedWine={selectedWine}
            />
            <Button 
                fullWidth
                disabled={!selectedWine} 
                variant={'contained'}
                onClick={handleSearch}
            >
                View
            </Button>
        </Container> 
    )
}
